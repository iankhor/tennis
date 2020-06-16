/**
 * Checkbox list examples
 */

'use strict'
var inquirer = require('inquirer')

inquirer
	.prompt([
		{
			type: 'checkbox',
			message: 'Select queries to run (You can choose multiple)',
			name: 'queries',
			choices: [
				new inquirer.Separator('Queries'),
				{
					name: 'Score Match <id maybe insert id based on file>',
				},
				{
					name: 'Games Player <make this dyamic player names>',
				},
			],
			validate: function (answer) {
				if (answer.length < 1) {
					return 'You must select at least one query'
				}

				return true
			},
		},
	])
	.then((answers) => {
		console.log(JSON.stringify(answers, null, '  '))
	})
