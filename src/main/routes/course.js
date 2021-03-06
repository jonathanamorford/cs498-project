const express = require('express');
const mustache = require('../common/mustache');
const html = require('../common/html');
const course_portfolio_lib = require('../lib/course_portfolio');
const router = express.Router();

const Department = require('../models/Department');
const TermType = require('../models/TermType');

const course_manage_page = async (res, course_id) => {
  course_info = await course_portfolio_lib.get(course_id);

  res.render('base_template', {
    title: 'CS498 Course Portfolio',
    body: mustache.render('course/manage', course_info),
  });
};

const course_new_page = async (res, department = false) => {
  const departments = await Department.query().select();
  const semesters = await (await TermType.query()
      .findById('semester'))
      .$relatedQuery('terms');
  let student_learning_outcomes = false;

  if (department) {
    student_learning_outcomes = await (await Department.query().findById(department))
        .$relatedQuery('student_learning_outcomes');
  }

  res.render('base_template', {
    title: 'New Course Portfolio',
    body: mustache.render('course/new', {
      departments,
      department,
      student_learning_outcomes,
      semesters,
    }),
  });
};

/* GET course home page */
router.route('/')
    .get(html.auth_wrapper(async (req, res, next) => {
      res.render('base_template', {
        title: 'Course Portfolios',
        body: mustache.render('course/index'),
      });
    }));

/* GET course page */
router.route('/:id')
    .get(html.auth_wrapper(async (req, res, next) => {
      if (req.params.id === 'new') {
        await course_new_page(res);
      } else {
        await course_manage_page(res, req.params.id);
      }
    }))
    .post(html.auth_wrapper(async (req, res, next) => {
      if (req.params.id === 'new') {
        if (req.body.course_submit) {
          const course_portfolio = await course_portfolio_lib.new({
            department_id: req.body.department,
            course_number: req.body.course_number,
            instructor: 1,
            semester: req.body.semester,
            year: req.body.course_year,
            num_students: req.body.num_students,
            student_learning_outcomes: Object.entries(req.body)
                .filter((entry) => entry[0].startsWith('slo_') && entry[1] === 'on')
                .map((entry) => entry[0].split('_')[1]),
            section: req.body.course_section,
          });

          res.redirect(302, `/course/${course_portfolio.id}`);
        } else {
          await course_new_page(res, req.body.department);
        }
      } else {
        await course_manage_page(res, 499);
      }
    }));

module.exports = router;
