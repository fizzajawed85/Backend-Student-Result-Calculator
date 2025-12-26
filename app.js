const readline = require('readline');
const greet = require('./greetings');
const result = require('./result');

// Create terminal input/output interface
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Ask student name
rl.question("Enter Student Name: ", name => {
  console.log(greet(name));

  // Ask number of subjects
  rl.question("How many subjects? ", count => {
    const subjectsCount = parseInt(count);
    const subjects = {};
    let current = 0;

    // Recursive function to ask subject name and marks
    const askSubject = () => {
      if (current < subjectsCount) {
        rl.question(`Enter subject ${current + 1} name: `, subName => {

          const askMarks = () => {
            rl.question(`Enter marks for ${subName}: `, mark => {
              const numMark = parseFloat(mark);

              // Validate marks 0-100
              if (isNaN(numMark) || numMark < 0 || numMark > 100) {
                console.log("Invalid! Enter marks between 0-100.");
                askMarks(); // retry
              } else {
                subjects[subName] = numMark;
                current++;
                askSubject(); // next subject
              }
            });
          };

          askMarks(); // ask marks for current subject
        });
      } else {
        // All subjects entered, calculate total, percentage, grade, status
        const marksArray = Object.values(subjects);
        const totalMarks = result.calculateTotal(marksArray);
        const percentage = parseFloat(result.calculatePercentage(totalMarks, subjectsCount).toFixed(2));
        const grade = result.calculateGrade(percentage);
        const status = result.calculateStatus(percentage);

        // Prepare subjects string for display
        let subjectsStr = '';
        for (let sub in subjects) subjectsStr += `  ${sub}: ${subjects[sub]}\n`;

        // Display final result using template literals
        console.log(`
----- Student Result -----
Student Name: ${name}
Subjects:
${subjectsStr}Total Marks: ${totalMarks}
Percentage: ${percentage.toFixed(2)}%
Grade: ${grade}
Status: ${status}
--------------------------
        `);

        rl.close(); // close terminal input
      }
    };

    askSubject(); // start asking subjects
  });
});
