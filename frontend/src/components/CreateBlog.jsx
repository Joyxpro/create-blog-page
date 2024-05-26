import React, { useState, useEffect } from 'react';
import backgroundImage from "../assets/backgroundImage.png"

const CreateBlog = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [textareaAttributes, setTextareaAttributes] = useState({ rows: 15, cols: 100 });

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const validateFileSize = () => {
        const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

        for (let i = 0; i < selectedFiles.length; i++) {
            if (selectedFiles[i].size > maxFileSize) {
                alert(`File ${selectedFiles[i].name} is too large. Maximum file size is 10MB.`);
                return false; // Prevent form submission
            }
        }

        return true; // Allow form submission
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (validateFileSize()) {
            // Proceed with form submission (e.g., send files to the server)
            console.log('Files are valid and can be submitted');
            // Normally, you would submit the form data here, possibly using fetch or axios
        }
    };

    useEffect(() => {
        const updateTextareaAttributes = () => {
            if (window.innerWidth >= 1024) {
                setTextareaAttributes({ rows: 15, cols: 115 });
            } else if (window.innerWidth >= 768) {
                setTextareaAttributes({ rows: 15, cols: 50 });
            } else if (window.innerWidth >= 640) {
                setTextareaAttributes({ rows: 10, cols: 50 });
            } else {
                setTextareaAttributes({ rows: 15, cols: 40 });
            }
        };

        window.addEventListener('resize', updateTextareaAttributes);
        updateTextareaAttributes(); // Initial check

        return () => {
            window.removeEventListener('resize', updateTextareaAttributes);
        };
    }, []);

    return (
        <div className='h-screen flex flex-col items-center text-white font-Roboto bg-center bg-cover bg-no-repeat max-w-screen' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className='md:text-4xl text-lg font-bold mb-2 mt-1'>Create Your Blog</h1>
            <form
                action='/createBlog'
                method='post'
                className="blog flex flex-col items-start justify-center bg-transparent text-white"
                onSubmit={handleSubmit}
            >
                <label htmlFor="blogTitle" className='flex gap-12 md:text-lg text-sm mb-2'><span className='md:text-2xl text-sm'>Blog Title:</span></label>
                <input
                    type="text"
                    name="blogTitle"
                    id="blogTitle"
                    placeholder='Enter Blog Title'
                    className="mb-4 p-2 bg-slate-200 bg-opacity-10 border-[0.8] text-black rounded-md w-[56vw] focus:bg-slate-200"
                    required
                    style={{ backgroundColor: 'rgba(66, 153, 225, 0.15)' }}
                />

                <label htmlFor="blogDesc" className='flex gap-2 text-lg mb-2'><span className='md:text-2xl text-sm'>Blog Content:</span></label>
                <textarea
                    name='blogDesc'
                    id='blogDesc'
                    placeholder='Enter Blog Content'
                    rows={textareaAttributes.rows}
                    cols={textareaAttributes.cols}
                    maxLength={1000}
                    minLength={10}
                    required
                    autoComplete='on'
                    dir='ltr'
                    className='resize-none mb-4 p-2 bg-slate-200 bg-opacity-10 border-[0.8] text-black rounded-md'
                />

                <label htmlFor="blogImage"><span className='md:text-2xl text-sm gap-2'>Your Blog Image:</span></label>
                <input
                    type='file'
                    name='blogImage'
                    id='blogImage'
                    accept='image/png, image/jpg, image/jpeg'
                    required
                    onChange={handleFileChange}
                    className="mb-2 p-1"
                />

                <button type="submit" className="p-2 bg-blue-500 text-white md:w-full  rounded md:text-xl text-sm hover:bg-blue-950 cursor-pointer transition-all duration-500 ease-in-out">Submit</button>
            </form>
        </div>
    );
};

export default CreateBlog;
