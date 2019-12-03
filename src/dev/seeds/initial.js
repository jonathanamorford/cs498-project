
exports.seed = knex => Promise.resolve((async () => {
	await knex('artifact_evaluation').del()
	await knex('artifact').del()
	await knex('portfolio_slo').del()
	await knex('portfolio').del()
	await knex('users').del()
	await knex('slo_metric').del()
	await knex('slo').del()
	await knex('course').del()
	await knex('department').del()
	await knex('term').del()
	await knex('term_type').del()


	/* USER SECTION */
	await knex('users').insert([
		{
			id: 1,
			linkblue_username: `user`
		}
	])
	/* DEPARTMENT SECTION */
	await knex('department').insert([
		{
			id: 1,
			identifier: `cs`,
			name: `Computer Science`
		}
	])
	/* TERM SECTION */
	await knex('term_type').insert([
		{
			id: 1,
			type: `semester`
		},
		{
			id: 2,
			type: `evaluation_option`
		}
	])
	await knex('term').insert([
		{
			id: 1,
			type: 1,
			value: `fall`
		},
		{
			id: 2,
			type: 1,
			value: `spring`
		},
		{
			id: 3,
			type: 1,
			value: `summer 1`
		},
		{
			id: 4,
			type: 1,
			value: `summer 2`
		},
		{
			id: 5,
			type: 1,
			value: `winter`
		},
		{
			id: 6,
			type: 2,
			value: `does not apply`
		},
		{
			id: 7,
			type: 2,
			value: `exceeds`
		},
		{
			id: 8,
			type: 2,
			value: `meets`
		},
		{
			id: 9,
			type: 2,
			value: `partially`
		},
		{
			id: 10,
			type: 2,
			value: `not`
		}
	])
	/* SLO SECTION */
	await knex('slo').insert([
		{
			id: 1,
			department_id: 1,
			index: 2,
			description: `Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.`
		}
	])
	await knex('slo_metric').insert([
		{
			id: 1,
			slo_id: 1,
			index: 1,
			name: `Identify and interpret client needs and design constraints`
		},
		{
			id: 2,
			slo_id: 1,
			index: 2,
			name: `Establish design evaluation metrics and procedures`
		},
		{
			id: 3,
			slo_id: 1,
			index: 3,
			name: `Develop a design whose product could reasonably meet design needs`
		},
		{
			id: 4,
			slo_id: 1,
			index: 4,
			name: `Articulate a proposed design and rationally support design decisions`
		},
		{
			id: 5,
			slo_id: 1,
			index: 5,
			name: `Identify and interpret client needs and design constraints`
		}
	])
})())