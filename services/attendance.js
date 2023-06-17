const Attendance = require("../models/attendance");
const Employee = require("../models/employee");
const Payprocess = require("../models/payprocess");
const Leave = require("../models/leave");
const mongoose = require("mongoose");

async function find(query = {}) {
  try {
    if (query.createdAt && "$gte" in query.createdAt) {
      query.createdAt["$gte"] = new Date(
        query.createdAt["$gte"].replace(/T.*Z/, "T00:00:00Z")
      );
    }
    if (query.createdAt && "$lte" in query.createdAt) {
      query.createdAt["$lte"] = new Date(
        query.createdAt["$lte"].replace(/T.*Z/, "T23:59:59Z")
      );
    }
    return await Attendance.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "attendance",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $addFields: {
          attendance: { $first: "$attendance" },
          employee: { $first: "$employee" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return await Attendance.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "fileuploads",
          localField: "_id",
          foreignField: "uploadId",
          as: "attendance",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $addFields: {
          attendance: { $first: "$attendance" },
          employee: { $first: "$employee" },
        },
      },
      { $limit: 1 },
    ]).exec();
  } catch (err) {
    throw err;
  }
}

async function aggregate(query = {}) {
  try {
    return await Attendance.aggregate(query).exec();
  } catch (err) {
    throw err;
  }
}

async function count(query = {}) {
  try {
    return await Attendance.count(query);
  } catch (err) {
    throw err;
  }
}

async function create(payload) {
  try {
    let goldRate = new Attendance(payload);
    return await goldRate.save();
  } catch (err) {
    throw err;
  }
}

async function update(id, payload) {
  try {
    return await Attendance.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    return await Attendance.deleteMany({
      _id: {
        $in: id.split(","),
      },
    }).exec();
  } catch (err) {
    throw err;
  }
}

async function consolidated(payload) {
  try {
    let salaryMonth = new Date(payload.date ?? new Date());
    salaryMonth = new Date(
      salaryMonth.toISOString().replace(/T.*Z/, "T00:00:00Z")
    );
    salaryMonth.setDate(1);
    salaryMonth.setMonth(salaryMonth.getMonth() - 1);
    let leaveMonth = new Date(salaryMonth);
    leaveMonth.setMonth(leaveMonth.getMonth() - 2);
    let fromDate = new Date(salaryMonth);
    let toDate = new Date(salaryMonth);
    toDate.setMonth(salaryMonth.getMonth() + 1);

    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "employee",
          pipeline: [
            {
              $lookup: {
                from: "branches",
                localField: "username",
                foreignField: "branchId",
                as: "branch",
              },
            },
            {
              $addFields: {
                branch: { $first: "$branch" },
              },
            },
          ],
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $first: "$user" },
        },
      },
      {
        $project: {
          _id: 1,
          employeeId: 1,
          name: 1,
          gender: 1,
          dob: 1,
          phoneNumber: 1,
          alternatePhoneNumber: 1,
          designation: 1,
          salary: 1,
          shiftEndTime: 1,
          shiftStartTime: 1,
          branchId: "$user.branch.branchId",
          branchName: "$user.branch.branchName",
        },
      },
    ]).exec();

    let report = [];
    for (let e of employees) {
      let emp = {
        employee: e,
      };

      let present = await Attendance.aggregate([
        {
          $match: {
            employee: e._id,
            $and: [
              { attendanceDate: { $gte: fromDate } },
              { attendanceDate: { $lt: toDate } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            present: { $count: {} },
          },
        },
        {
          $project: {
            _id: 0,
            present: 1,
          },
        },
      ]).exec();
      let payroll = await Payprocess.aggregate([
        {
          $match: {
            employee: e._id,
            $and: [
              { createdAt: { $gte: fromDate } },
              { createdAt: { $lt: toDate } },
            ],
          },
        },
        {
          $addFields: {
            allowances: {
              $cond: {
                if: { $eq: ["$type", "allowances"] },
                then: "$amount",
                else: 0,
              },
            },
            deductions: {
              $cond: {
                if: { $eq: ["$type", "deductions"] },
                then: "$amount",
                else: 0,
              },
            },
            advance: {
              $cond: {
                if: { $eq: ["$type", "advance"] },
                then: "$amount",
                else: 0,
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            allowances: { $sum: "$allowances" },
            deductions: { $sum: "$deductions" },
            advance: { $sum: "$advance" },
          },
        },
      ]).exec();
      let leave = await Leave.aggregate([
        {
          $match: {
            employee: e._id,
            status: "approved",
            createdAt: { $gte: leaveMonth },
          },
        },
        { $unwind: "$dates" },
        {
          $match: {
            $and: [{ dates: { $gte: fromDate } }, { dates: { $lt: toDate } }],
          },
        },
        { $count: "leave" },
      ]).exec();

      emp.present = present[0]?.present ?? 0;
      emp.allowances = payroll[0]?.allowances ?? 0;
      emp.deductions = payroll[0]?.deductions ?? 0;
      emp.advance = payroll[0]?.advance ?? 0;
      emp.absent = leave[0]?.leave ?? 0;
      emp.lateDays = 0;
      emp.lateMins = 0;
      emp.workingDays = new Date(
        salaryMonth.getFullYear(),
        salaryMonth.getMonth() + 1,
        0
      ).getDate();
      emp.salary = +(e.salary ?? 0);
      if (emp.salary > 0) {
        emp.payable = Math.round(
          emp.salary -
            (emp.salary / emp.workingDays) * emp.absent +
            emp.allowances -
            emp.deductions -
            emp.advance
        );
      } else {
        emp.payable = 0;
      }
      report.push(emp);
    }

    return report;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  find,
  findById,
  aggregate,
  count,
  create,
  update,
  remove,
  consolidated,
};
