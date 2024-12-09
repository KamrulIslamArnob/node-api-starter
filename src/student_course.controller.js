const course = require("./model/course.model"); 
const person = require("./model/person.model"); 
const studentcourse = require("./model/student_course.model"); 


const studentController = {

    async addPerson(req, res) {
        try {
          const { name, age, salary } = req.body;
    
          const newPost = new person({  name, age, salary  });
          await newPost.save();
          res
            .status(201)
            .json({ message: "Post created successfully", post: newPost });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      async addCourse(req, res) {
        try {
          const { course_name} = req.body;
    
          const newPost = new course({ course_name});
          await newPost.save();
          res
            .status(201)
            .json({ message: "Post created successfully", post: newPost });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      async addStudentCourse(req, res) {
        const { student_id, course_id } = req.body;

        // Validate input
        if (!student_id || !course_id) {
            return res.status(400).json({ error: 'Both student_id and course_id are required' });
        }
    
        try {
            // Create a new studentcourse document
            const newEntry = new studentcourse({ student_id, course_id });
            const savedEntry = await newEntry.save();
    
            res.status(201).json({
                message: 'Data added successfully',
                data: savedEntry,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error adding data', details: error.message });
        }
      },

      async getStudentCourse(req, res) {
        try {
            // Fetch all student-course data with populated fields
            const data = await studentcourse
                .find()
                .populate('student_id', 'name age') // Populate student name and age
                .populate('course_id', 'course_name'); // Populate course name
    
            // Transform the data into the desired format
            const groupedData = data.reduce((acc, entry) => {
                const { student_id, course_id } = entry;
                const studentName = student_id.name;
                const studentAge = student_id.age;
                const courseName = course_id.course_name;
    
                // Check if the student already exists in the result
                let student = acc.find(item => item.name === studentName);
    
                if (!student) {
                    // If the student does not exist, add them
                    student = { name: studentName, age: studentAge, courses: [] };
                    acc.push(student);
                }
    
                // Add the course to the student's courses
                student.courses.push(courseName);
    
                return acc;
            }, []);
    
            res.status(200).json(groupedData);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching student courses', details: error.message });
        }
    }
    
};

module.exports = studentController;
