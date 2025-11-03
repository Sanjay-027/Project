import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// Sample data arrays
const locations = ["Delhi NCR", "Noida", "Pune", "Mumbai"];
const industries = ["Frontend Developer", "Backend Developer", "FullStack Developer"];
const salaries = [
    { min: 0, max: 40000, range: "0-40k" },
    { min: 42000, max: 100000, range: "42-1akh" },
    { min: 100000, max: 500000, range: "1lakh to 5 lakh" }
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const companies = [
    { name: "Tech Innovators", description: "Leading technology solutions provider", website: "https://techinnovators.com", location: "Delhi NCR" },
    { name: "Digital Solutions Inc", description: "Digital transformation experts", website: "https://digitalsolutions.com", location: "Mumbai" },
    { name: "CodeCraft Labs", description: "Custom software development", website: "https://codecraft.com", location: "Pune" },
    { name: "DataDrive Systems", description: "Data analytics and AI solutions", website: "https://datadrive.com", location: "Noida" },
    { name: "CloudNine Tech", description: "Cloud infrastructure services", website: "https://cloudnine.com", location: "Delhi NCR" },
    { name: "WebWorks Studio", description: "Web design and development", website: "https://webworks.com", location: "Mumbai" },
    { name: "AppForge Solutions", description: "Mobile app development", website: "https://appforge.com", location: "Pune" },
    { name: "ByteBuilders", description: "Enterprise software solutions", website: "https://bytebuilders.com", location: "Noida" },
    { name: "PixelPerfect", description: "UI/UX design agency", website: "https://pixelperfect.com", location: "Delhi NCR" },
    { name: "DevDynamics", description: "Agile development team", website: "https://devdynamics.com", location: "Mumbai" }
];

const jobTitles = {
    "Frontend Developer": [
        "Senior React Developer",
        "Frontend Engineer",
        "UI Developer",
        "Vue.js Developer",
        "Angular Developer"
    ],
    "Backend Developer": [
        "Node.js Developer",
        "Python Backend Engineer",
        "Java Backend Developer",
        "API Developer",
        "Database Engineer"
    ],
    "FullStack Developer": [
        "MERN Stack Developer",
        "Full Stack Engineer",
        "Software Developer",
        "Full Stack Architect",
        "DevOps Engineer"
    ]
};

const requirements = {
    "Frontend Developer": [
        "3+ years experience with React/Vue/Angular",
        "Strong knowledge of HTML, CSS, JavaScript",
        "Experience with responsive design",
        "Knowledge of modern frontend frameworks",
        "Git version control"
    ],
    "Backend Developer": [
        "3+ years experience with Node.js/Python/Java",
        "Strong understanding of databases (SQL/NoSQL)",
        "RESTful API design",
        "Experience with cloud platforms (AWS/Azure)",
        "Knowledge of microservices architecture"
    ],
    "FullStack Developer": [
        "4+ years full stack development experience",
        "Proficiency in frontend and backend technologies",
        "Database design and optimization",
        "CI/CD pipeline knowledge",
        "Agile development experience"
    ]
};

const descriptions = {
    "Frontend Developer": "We are looking for a talented Frontend Developer to create amazing user experiences. You will work on cutting-edge web applications and collaborate with our design team to bring mockups to life.",
    "Backend Developer": "Join our backend team to build scalable and robust server-side applications. You'll work with modern technologies and contribute to our microservices architecture.",
    "FullStack Developer": "We need a versatile Full Stack Developer who can handle both frontend and backend development. You'll be involved in the entire development lifecycle from conception to deployment."
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log("Clearing existing data...");
        await Job.deleteMany({});
        await Company.deleteMany({});
        await User.deleteMany({});

        // Create a recruiter user
        console.log("Creating recruiter user...");
        const hashedPassword = await bcrypt.hash("password123", 10);
        const recruiter = await User.create({
            fullName: "John Recruiter",
            email: "recruiter@careerwave.com",
            phoneNumber: 9876543210,
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "HR Manager at multiple tech companies",
            }
        });

        console.log("Created recruiter:", recruiter.email);

        // Create companies
        console.log("Creating companies...");
        const createdCompanies = [];
        for (const companyData of companies) {
            const company = await Company.create({
                ...companyData,
                userId: recruiter._id
            });
            createdCompanies.push(company);
        }

        console.log(`Created ${createdCompanies.length} companies`);

        // Create 50 jobs
        console.log("Creating 50 jobs...");
        const jobs = [];
        
        for (let i = 0; i < 50; i++) {
            const industry = industries[i % industries.length];
            const location = locations[i % locations.length];
            const salaryRange = salaries[i % salaries.length];
            const company = createdCompanies[i % createdCompanies.length];
            const jobType = jobTypes[i % jobTypes.length];
            const titleOptions = jobTitles[industry];
            const title = titleOptions[i % titleOptions.length];

            const job = {
                title: title,
                description: descriptions[industry],
                requirements: requirements[industry],
                salary: salaryRange.min + Math.floor(Math.random() * (salaryRange.max - salaryRange.min)),
                experienceLevel: Math.floor(Math.random() * 5) + 1, // 1-5 years
                location: location,
                jobType: jobType,
                position: Math.floor(Math.random() * 5) + 1, // 1-5 positions
                company: company._id,
                created_by: recruiter._id,
                applications: []
            };

            jobs.push(job);
        }

        await Job.insertMany(jobs);
        console.log(`✅ Successfully created ${jobs.length} jobs!`);

        // Summary
        console.log("\n📊 Database Seeding Summary:");
        console.log(`   - Users: 1 recruiter`);
        console.log(`   - Companies: ${createdCompanies.length}`);
        console.log(`   - Jobs: ${jobs.length}`);
        console.log("\n🎉 Database seeded successfully!");
        console.log("\nLogin credentials:");
        console.log("   Email: recruiter@careerwave.com");
        console.log("   Password: password123");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
