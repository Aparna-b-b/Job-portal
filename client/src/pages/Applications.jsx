import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Applications = () => {
  const { user } = useUser()
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
  if (!resume) {
    toast.error("Please select a resume file");
    return;
  }

  setIsUploading(true);
  
  try {
    const formData = new FormData();
    formData.append('resume', resume);

    const token = await getToken();
    const endpoint = `${backendUrl}/api/users/upload`;
    
    console.log("Uploading to:", endpoint); // Debug log

    const { data } = await axios.post(
      endpoint,
      formData,
      { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 seconds timeout
      }
    );
    
    if (data.success) {
      toast.success(data.message);
      await fetchUserData();
      setIsEdit(false);
      setResume(null);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Full error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    
    if (error.response) {
      // Server responded with a status code outside 2xx
      toast.error(`Server error: ${error.response.status} - ${error.response.data?.message || 'No message'}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response from server. Check your connection.');
    } else {
      // Something happened in setting up the request
      toast.error(`Request error: ${error.message}`);
    }
  } finally {
    setIsUploading(false);
  }
};

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  if (!isLoaded) {
    return <Loading />
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="mb-6">Please sign in to view your job applications</p>
          <button 
            onClick={() => navigate('/sign-in')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isEdit || (userData && !userData.resume) ? (
              <>
                <label className='flex items-center' htmlFor='resumeUpload'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-l-lg'>
                    {resume ? resume.name : "Select resume"}
                  </p>
                  <input 
                    id='resumeUpload' 
                    onChange={e => setResume(e.target.files[0])} 
                    accept='application/pdf' 
                    type='file' 
                    hidden 
                  />
                  <span className='bg-blue-100 text-blue-600 px-4 py-2 rounded-r-lg cursor-pointer'>
                    Browse
                  </span>
                </label>
                <button 
                  onClick={updateResume} 
                  disabled={isUploading || !resume}
                  className={`${isUploading || !resume ? 'bg-gray-200' : 'bg-green-100 border border-green-400'} rounded-lg px-4 py-2`}
                >
                  {isUploading ? 'Saving...' : 'Save'}
                </button>
                {!isUploading && (
                  <button 
                    onClick={() => {
                      setIsEdit(false);
                      setResume(null);
                    }} 
                    className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <div className='flex gap-2'>
                {userData?.resume ? (
                  <a 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    href={userData.resume} 
                    className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:underline'
                  >
                    View Resume
                  </a>
                ) : (
                  <span className='bg-gray-100 text-gray-600 px-4 py-2 rounded-lg'>
                    No Resume Uploaded
                  </span>
                )}
                <button 
                  onClick={() => setIsEdit(true)} 
                  className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
                >
                  {userData?.resume ? 'Change' : 'Upload'}
                </button>
              </div>
            )
          }
        </div>
        
        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b text-left'>Company</th>
                <th className='py-3 px-4 border-b text-left'>Job Title</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.length > 0 ? (
                userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className='py-3 px-4 flex items-center gap-2 border-b'>
                      <img className='w-8 h-8 rounded-full object-cover' src={job.companyId.image} alt='' />
                      {job.companyId.name}
                    </td>
                    <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                    <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 border-b'>
                      <span className={`${job.status === 'Accepted' ? 'bg-green-100 text-green-800' : job.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'} px-4 py-1.5 rounded text-sm font-medium`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Applications