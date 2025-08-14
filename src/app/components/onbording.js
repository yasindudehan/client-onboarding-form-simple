
"use client"; 
import { useState ,useRef, useEffect} from "react";
import PopError from "./error";
import axios from "axios";
import {z} from "zod";
import { useForm } from "react-hook-form"; 
import {zodResolver} from "@hookform/resolvers/zod";
  const skills = ["JavaScript", "React", "Java", "Spring Boot", "AWS"];
  const formSchema = z.object({
    fullName: z.string().trim().min(2,"Must be 2 to 80 characters").max(80,"Must be 2 to 80 characters").regex(/^[\p{L} '’-]+$/u, "Only letters, spaces, apostrophes (’ or '), and hyphens (-) are allowed."),
    email: z.string().trim().min(1,"Email is required").email("Invalid email address"),
    companyName: z.string().min(2,"Must be 2 to 100 characters").max(100,"Must be 2 to 100 characters"),
    services: z.array(z.enum(skills)).min(1,"At least one skill is required"),
     budgetUsd:z.number().int().min(100,"Must be at least $100").max(1000000,"Must be at most $1,000,000").optional(),
     projectStartDate:z.string()
     .min(1,"Start date is required")
     
     .refine((date) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const selectedDate = new Date(date);
  return selectedDate >= today;
}, { message: "Date must be today or later." }),
     acceptTerms: z.boolean().refine((val) => val === true, {
       message: "You must accept the terms and conditions",
     }),
  });



export default function Onboarding() {

   

const [selectedSkills, setSelectedSkills] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
const [popError, setPopError] = useState("");
  const dropdownRef = useRef(null);


  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { register, handleSubmit,setValue,  
  watch,  formState: { errors,isValid } } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
      defaultValues: {
    skills: [], 
    acceptTerms: false
  }
  });
  useEffect(() => {
  // only update if form is initialized
  if (setValue) {
    setValue("services", selectedSkills, { shouldValidate: true });
  }
}, [selectedSkills, setValue]);
  

  const onSubmit=async (data)=>{
    console.log(data);
      try {
    // Replace with your external API endpoint
    const response = await axios.post(process.env.NEXT_PUBLIC_ONBOARD_URL, data , {
        headers: {
          "Content-Type": "application/json",
        },
      });

    console.log("Response:", response.data);
    alert("Form submitted successfully!");
  } catch (error) {
     if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error(error)
            setPopError("No response from server. Please try again later.");
          } else {
            setPopError(error.response.data.message || "Server returned an error.");
          }
        } else if (error.request) {
          setPopError("No response from server. Please try again later.");
        } else {
          setPopError(`Request error: ${error.message}`);
        }
      } else {
        setPopError("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    

  }
  }
  return (
  
   <div className="min-h-screen flex items-center justify-center bg-green-300 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row text-center md:text-left">
        
 
        <div className="bg-blue-600 md:flex-1 md:h-screen rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-white mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4 pt-10">Welcome!</h1>
          <p className="text-white mb-6">Please fill out the form to get started.</p>
        </div>
       
        <div className="md:flex-[2] md:ml-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Employee Info</h1>
          {popError && <PopError message={popError} onClose={() => setPopError("")} />}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Enter your full name"  {...register("fullName")}/>
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email </label>
              <input type="email" className="w-full border rounded-md p-2" placeholder="Enter your email" {...register("email")}/>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Company</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Enter your company" {...register("companyName")}/>
              {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>}
            </div>


            <div className="relative" ref={dropdownRef}>
              <label className="block mb-1 text-sm font-medium">Services</label>
              <div
                className="border rounded-md p-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedSkills.length > 0 ? selectedSkills.join(", ") : "Select services"}
              </div>
{errors.services && <p className="text-red-600 text-sm">{errors.services.message}</p>}
              {dropdownOpen && (
                <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                  {skills.map(skill => (
                    <label key={skill} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Budget</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Enter your budget" {...register("budgetUsd",{valueAsNumber:true})} />
              {errors.budgetUsd && <p className="text-red-600 text-sm mt-1">{errors.budgetUsd.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Start Date</label>
              <input type="date" className="w-full border rounded-md p-2" {...register("projectStartDate")} />
              {errors.projectStartDate && <p className="text-red-600 text-sm mt-1">{errors.projectStartDate.message}</p>}
            </div>
          <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("acceptTerms")} />
                <span>I accept the terms and conditions</span>
              </label>
              {errors.acceptTerms && <p className="text-red-600 text-sm">{errors.acceptTerms.message}</p>}
            </div>
              <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-2 rounded-md font-bold transition ${
                isValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
