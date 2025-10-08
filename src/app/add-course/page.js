"use client";
import { useEffect, useState } from "react";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../common/Header";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function NewCourse() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const router = useRouter();

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         // Modern browsers ignore custom messages
    //         e.preventDefault();
    //         e.returnValue = ''; // This triggers the confirmation dialog
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);



    const [activeTab, setActiveTab] = useState("online-course");

    return (
        <div className=" grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}


            <div>

                <Header />
                <main className="w-full px-10 py-3 h-[90vh] overflow-y-scroll ">

                    <header className="mb-4 ">
                        <h1 className="text-[40px] font-bold text-gray-800 capitalize">
                            Add & view course
                        </h1>
                    </header>
                    <div>
                        <p className="text-[18px] flex items-center gap-[5px]">
                            <div className="bg-gray-950 w-[9px] h-[9px] rounded-full"></div>{" "}
                            Select field
                        </p>
                        <div className="grid grid-cols-4 gap-3 my-4">
                            <button
                                onClick={() => setActiveTab("online-course")}
                                className={`${activeTab === "online-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Online Course
                            </button>
                            <button
                                onClick={() => setActiveTab("view-online-course")}
                                className={`${activeTab === "view-online-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                view online Course
                            </button>
                            <button
                                onClick={() => setActiveTab("offline-course")}
                                className={`${activeTab === "offline-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Offline Course
                            </button>

                            <button
                                onClick={() => setActiveTab("view-offline-course")}
                                className={`${activeTab === "view-offline-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                view  Offline Course
                            </button>
                        </div>
                    </div>
                    {activeTab === 'online-course' &&
                        <OnlineCourse apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'offline-course' &&
                        <OfflineCourse apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-online-course' &&

                        <ViewOnlineCourse setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-offline-course' &&

                        <ViewOfflineCourse setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                </main>

            </div>

        </div>
    );
}

export function OnlineCourse({ apiBaseUrl }) {

    // url working 

    const editId = window.location.hash.replace('#', '');

    // all states

    const [previewImage, setPreviewImage] = useState("/previewimg.webp");

    const [courseBannerImgPreview, setCourseBannerImgPreview] =
        useState("/previewimg.webp");

    const [courseHeroImgPreview, setCourseHeroImgPreview] =
        useState("/previewimg.webp");

    const [courseName, setCourseName] = useState("");

    const [courseAbout, setCourseAbout] = useState("");

    const [cousreHeadline, setCousreHeadline] = useState([])

    const [coursePrice, setCoursePrice] = useState("");

    const [coursePoints, setCoursePoints] = useState(["", "", ""]);

    const [whatYouLearnPoints, setWhatYourLearnPoints] = useState(["", "", ""]);

    const [studyMaterialName, setStudyMaterialName] = useState([])

    const [studyMaterials, setStudyMaterials] = useState([])

    const [recordingTitles, setRecordingTitles] = useState([""]);

    const [recordingDurations, setRecordingDurations] = useState([""]);

    const [recordingUrls, setRecordingUrls] = useState([""]);

    const [courseFaqsQuestions, setCourseFaqQuestions] = useState([])

    const [courseFaqsAnswer, setCourseFaqsAnswer] = useState([])

    const [categoryName, setCategoryName] = useState('')

    const [categoryData, setCategoryData] = useState([])

    const [staticPath, setStaticPath] = useState('')

    const [courseCategory, setCourseCategory] = useState('tarun');


    // all add something functions

    const addCoursePoints = () => {
        setCoursePoints([...coursePoints, ""]);
    };

    const addWhatYouLearn = () => {
        setWhatYourLearnPoints([...whatYouLearnPoints, ""]);
    };

    const [faqs, setFaqs] = useState([
        { question: "", answer: "" },
        { question: "", answer: "" },
    ]);

    const addRecording = () => {
        setRecordingTitles([...recordingTitles, ""]);
        setRecordingDurations([...recordingDurations, ""]);
        setRecordingUrls([...recordingUrls, ""]);
    };

    const addStudyMaterial = () => {
        setStudyMaterialName([...studyMaterialName, ""]);
        setStudyMaterials([...studyMaterials, ""])
    };

    const addFaq = () => {
        setCourseFaqQuestions([...courseFaqsQuestions, ""]);
        setCourseFaqsAnswer([...courseFaqsAnswer, ""])
    };


    // all api's working

    const addOnlineCourse = (event) => {
        event.preventDefault();
        const allData = new FormData(event.target);

        if (editId) {
            //update course
            axios.post(`${apiBaseUrl}/course/update-course/${editId}`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Course Updated Successfully',
                            text: 'Course details updated.',
                            icon: 'success',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                    else if (finalRes.status == 2) {
                        Swal.fire({
                            title: 'Course Already Exist',
                            text: 'This course Name is Already Exist.',
                            icon: 'warning',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Something Went Wrong',
                            text: 'Try again later',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }

                })
        }
        else {
            axios
                .post(`${apiBaseUrl}/course/add-online`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Course Added Successfully !',
                            text: 'New course added in online courses.',
                            icon: 'success',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                        // .then((res) => {
                        //     window.location.reload()
                        // })
                    }

                    else if (finalRes.status == 2) {
                        Swal.fire({
                            title: 'Course Already Exist',
                            text: 'This course Name is Already Exist.',
                            icon: 'warning',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Something went wrong ',
                            text: 'Try again later ',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }
                })
        }
    }

    const addCategory = (event) => {
        event.preventDefault();
        axios.post(`${apiBaseUrl}/category/add-online-category`, { categoryName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: 'Category Added Successfully ',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'success'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }
                else if (finalRes.status == 2) {
                    Swal.fire({
                        title: 'Category already Exist ! ',
                        text: 'try another One',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'warning'
                    })
                }
                else {
                    Swal.fire({
                        title: 'Something went wrong ! ',
                        text: 'try again later',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'error'
                    })
                }
            })
    }

    const fetchOnlineCategory = () => {
        axios.get(`${apiBaseUrl}/category/view-online-category`)
            .then((res) => res.data)
            .then((finalRes) => {
                setCategoryData(finalRes.categoryData)
            })
    }


    // all handlefunctions

    const handleTitleChange = (index, value) => {
        const updated = [...recordingTitles];
        updated[index] = value;
        setRecordingTitles(updated);
    };

    const handleDurationChange = (index, value) => {
        const updated = [...recordingDurations];
        updated[index] = value;
        setRecordingDurations(updated);
    };

    const handleUrlChange = (index, value) => {
        const updated = [...recordingUrls];
        updated[index] = value;
        setRecordingUrls(updated);
    };

    const handleFaqQuestionChange = (index, value) => {
        const updated = [...courseFaqsQuestions];
        updated[index] = value;
        setCourseFaqQuestions(updated);
    };

    const handleFaqAnswerChange = (index, value) => {
        const updated = [...courseFaqsAnswer];
        updated[index] = value;
        setCourseFaqsAnswer(updated);
    };

    const handleStudyMaterialNameChange = (index, value) => {
        const updated = [...studyMaterialName];
        updated[index] = value;
        setStudyMaterialName(updated);
    };

    const handleStudyMaterialFileChange = (index, file) => {
        const updated = [...studyMaterials];
        updated[index] = file;
        setStudyMaterials(updated);
    };

    const handleCoursePointsChange = (index, value) => {
        const updated = [...coursePoints]
        updated[index] = value
        setCoursePoints(updated)

    }

    const handleWhatYouLearnChange = (index, value) => {
        const updatedPoints = [...whatYouLearnPoints];
        updatedPoints[index] = value;
        setWhatYourLearnPoints(updatedPoints);
    };



    // all useeffects
    useEffect(() => {
        fetchOnlineCategory()
    }, [])

    useEffect(() => {
        if (editId) {
            axios.get(`${apiBaseUrl}/category/fetch-category-by-id/${editId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes)
                })
        }
    }, [editId])


    useEffect(() => {
        if (editId) {
            axios
                .get(`${apiBaseUrl}/course/edit-course/${editId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status === 1) {
                        const course = finalRes.findCourseById;
                        const staticPath = finalRes.staticPath;

                        setStaticPath(staticPath);
                        // ✅ Set basic fields
                        setCourseName(course.courseName || "");
                        setCousreHeadline(course.cousreHeadline || "");
                        setCourseAbout(course.courseAbout || "");
                        setCoursePrice(course.coursePrice || "");
                        // ✅ Set images
                        setPreviewImage(staticPath + course.courseImage);
                        setCourseBannerImgPreview(staticPath + course.courseBannerImage);
                        setCourseHeroImgPreview(staticPath + course.courseHeroImage);

                        // ✅ Set description points
                        if (Array.isArray(course.coursePoints)) {
                            setCoursePoints(course.coursePoints);
                        }

                        // ✅ Set What You Learn points
                        if (Array.isArray(course.courseLearnPoints)) {
                            setWhatYourLearnPoints(course.courseLearnPoints);
                        }


                        // ✅ Set recordings (titles, durations, urls separately)
                        if (Array.isArray(course.courseRecordingTitle)) {
                            setRecordingTitles(course.courseRecordingTitle)
                        }
                        if (Array.isArray(course.courseRecordingDuration)) {
                            setRecordingDurations(course.courseRecordingDuration)
                        }
                        if (Array.isArray(course.courseRecordingUrl)) {
                            setRecordingUrls(course.courseRecordingUrl)
                        }

                        // ✅ Set study materials (names and files separately)
                        if (Array.isArray(course.courseStudyMaterialName)) {
                            setStudyMaterialName(course.courseStudyMaterialName);
                        }

                        if (Array.isArray(course.courseStudyMaterials)) {
                            setStudyMaterials(staticPath + course.courseStudyMaterials);
                        }

                        // ✅ Set FAQs
                        if (Array.isArray(course.courseFaqsQuestions)) {
                            setCourseFaqQuestions(course.courseFaqsQuestions);
                        }
                        if (Array.isArray(course.courseFaqsAnswer)) {
                            setCourseFaqsAnswer(course.courseFaqsAnswer);
                        }

                    }
                });
        }
    }, [editId]);

    const DeleteWhatYouLearnPoints = (editId, windex) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'white',
            iconColor: 'black',
            color: 'black'
        }).then((res) => {
            if (res.isConfirmed) {
                // User confirmed, now send the delete request
                axios
                    .post(`${apiBaseUrl}/course/learn-points-delete/${editId}`, { windex })
                    .then((response) => {
                        const finalRes = response.data;

                        if (finalRes.status === 1) {
                            setWhatYourLearnPoints(finalRes.updatedPoints);

                            Swal.fire({
                                title: 'Point Deleted Successfully!',
                                icon: 'success',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black',
                                timer: 1500,
                                showConfirmButton: true,
                                confirmButtonColor: 'black'
                            });
                        } else {
                            Swal.fire({
                                title: 'Something went wrong!',
                                text: 'Please save the course before deleting.',
                                icon: 'error',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black'
                            });
                        }
                    })
                    .catch((err) => {
                        console.error('Error deleting point:', err);
                        Swal.fire({
                            title: 'Server Error!',
                            text: 'Something went wrong while deleting.',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        });
                    });
            }
        });
    };


    const DeleteCoursePoints = (editId, cIndex) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'white',
            iconColor: 'black',
            color: 'black'
        }).then((res) => {
            if (res.isConfirmed) {
                // Now send the request only if confirmed
                axios.post(`${apiBaseUrl}/course/delete-online-course-points/${editId}`, { cIndex })
                    .then((response) => {
                        const finalRes = response.data;

                        if (finalRes.status === 1) {
                            console.log(finalRes.updatedPoints)
                            setCoursePoints(finalRes.updatedPoints);
                            Swal.fire({
                                title: 'Point Deleted Successfully!',
                                icon: 'success',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black',
                                timer: 1500,
                                showConfirmButton: true,
                                confirmButtonColor: 'black'
                            });
                        } else {
                            Swal.fire({
                                title: 'Something went wrong!',
                                text: 'Please save the course before deleting.',
                                icon: 'error',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black'
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Server error occurred while deleting the point.',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        });
                    });
            }
        });
    };




    return (
        <>
            <form onSubmit={addCategory} className="bg-white shadow-sm p-5 rounded border border-gray-50" >
                <label className="block mb-1 font-semibold ">Add New Category</label>
                <input
                    required
                    onChange={(e) => setCategoryName(e.target.value)}
                    name="categoryName"
                    placeholder="Ug Exams"
                    type="text"
                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                />
                <button className="bg-gray-950  hover:bg-green-900 duration-300 px-3 py-2 rounded cursor-pointer text-white">+Add Category</button>
            </form>


            <form onSubmit={addOnlineCourse}>

                <div className="max-w-6xl mx-auto p-6 shadow-sm bg-white border border-gray-100 rounded-md my-8">
                    <h2 className="text-3xl font-bold mb-6 capitalize">{editId ? 'update online course' : 'Add New Online Course'} </h2>

                    {/* Course Basic Info */}
                    <section className="mb-8">


                        <label className="block mb-1 font-semibold">Select Category</label>
                        <select
                            disabled={editId}
                            onChange={(e) => e.target.value}
                            name="courseCategory"
                            placeholder="Nid ug course"
                            type="text"
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        >
                            <option>Select Category</option>
                            {categoryData.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.categoryName}</option>
                                )
                            })}
                        </select>



                        <label className="block mb-1 font-semibold">Course Name</label>
                        <input


                            name="courseName"
                            placeholder="Nid ug course"
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        />

                        <div className="my-5">
                            <p className=" block mb-1 font-semibold">Course Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded max-w-[300px] max-h-[250px]"
                                    src={previewImage}
                                />

                                <input

                                    name="courseImage"
                                    onChange={(e) =>
                                        setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>

                        <label className="block mb-1 font-semibold">Course Headline</label>
                        <input

                            name="cousreHeadline"
                            placeholder="Designing Expert course"
                            type="text"
                            value={cousreHeadline}
                            onChange={(e) => setCousreHeadline(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        />

                        <label className="block mb-1 font-semibold">About Course</label>
                        <textarea

                            name="courseAbout"
                            placeholder="An Exellent Mentorship with the best guidance"
                            value={courseAbout}
                            onChange={(e) => setCourseAbout(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                            rows={3}
                        ></textarea>

                        <div className="my-5">
                            <p className="block mb-1 font-semibold">Course Banner Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded max-w-[300px] max-h-[300px]"
                                    src={courseBannerImgPreview}
                                />
                                <input

                                    name="courseBannerImage"
                                    onChange={(e) =>
                                        setCourseBannerImgPreview(
                                            URL.createObjectURL(e.target.files[0])
                                        )
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>

                        <label className="block mb-1 font-semibold">Course Points</label>
                        {coursePoints.map((point, i) => (
                            <div key={i} className="mb-4 flex items-center gap-3">
                                <input

                                    name="coursePoints"
                                    key={i}
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleCoursePointsChange(i, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 "
                                    placeholder={`Point ${i + 1}`}
                                />
                                <span onClick={() => DeleteCoursePoints(editId, i)} className="bg-white border border-gray-950 text-black cursor-pointer  hover:text-white hover:bg-gray-950 duration-300 rounded py-2 px-3 text-[23px]"><MdDelete /></span>
                            </div>
                        ))}
                        <button
                            onClick={addCoursePoints}
                            type="button"
                            className="bg-gray-950 text-white hover:bg-green-900 duration-300 px-3 cursor-pointer py-2 rounded mb-4"
                        >
                            + Add Point
                        </button>

                        <label className="block mb-1 font-semibold">Course Price (₹)</label>
                        <input

                            name="coursePrice"
                            type="number"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            placeholder="4999"
                            className="w-32 border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                            min="0"
                        />

                        <div className="my-5">
                            <p className="block mb-1 font-semibold">Course Hero Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded min-w-[300px] max-h-[300px]"
                                    src={courseHeroImgPreview}
                                />
                                <input

                                    name="courseHeroImage"
                                    onChange={(e) =>
                                        setCourseHeroImgPreview(
                                            URL.createObjectURL(e.target.files[0])
                                        )
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Recordings Section */}
                    <section className="mb-8">
                        <h3 className="text-3xl font-bold mb-4 capitalize">{editId ? "update Recording Section" : "Recording Section"}</h3>

                        {/* recording details */}
                        {recordingTitles.map((_, recIndex) => (
                            <div
                                key={recIndex}
                                className="border border-gray-200 p-5 rounded my-3"
                            >
                                {/* Title */}
                                <label className="block mb-1 font-semibold">Recording Title</label>
                                <input

                                    placeholder="Introduction to Nid"
                                    type="text"
                                    name="courseRecordingTitle[]"
                                    value={recordingTitles[recIndex]}
                                    onChange={(e) => handleTitleChange(recIndex, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-3"
                                />

                                {/* Duration */}
                                <label className="block mb-1 font-semibold">Duration</label>
                                <input

                                    type="text"
                                    name="courseRecordingDuration[]"
                                    placeholder="e.g. 15:30"
                                    value={recordingDurations[recIndex]}
                                    onChange={(e) => handleDurationChange(recIndex, e.target.value)}
                                    className="w-32 border border-gray-300 rounded focus:outline-none px-3 py-2 mb-3"
                                />

                                {/* Video URL */}
                                <label className="block mb-1 font-semibold">Video URL</label>
                                <input

                                    name="courseRecordingUrl[]"
                                    type="url"
                                    placeholder="https://example.com/video.mp4"
                                    value={recordingUrls[recIndex]}
                                    onChange={(e) => handleUrlChange(recIndex, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                                />
                            </div>
                        ))}

                        {/* Add Recording Button */}
                        <button
                            type="button"
                            onClick={addRecording}
                            className="bg-gray-950 my-5 w-fit text-white px-4 py-2 rounded cursor-pointer duration-300 hover:bg-green-900"
                        >
                            + Add Recording
                        </button>

                        {/* Study Materials */}
                        <div className="mb-4 p-5 border border-gray-200 rounded">
                            <h4 className="font-semibold mb-2">Study Materials</h4>
                            {/* Study Materials */}
                            <div className="mb-4 p-5 border border-gray-200 rounded">
                                <h4 className="font-semibold mb-2">Study Materials</h4>

                                {studyMaterialName.map((_, matIndex) => (
                                    <div
                                        key={matIndex}
                                        className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4"
                                    >
                                        {/* Material Name Input */}
                                        <input

                                            name="courseStudyMaterialName[]"
                                            type="text"
                                            placeholder="Material Name"
                                            value={studyMaterialName[matIndex] || ""}
                                            onChange={(e) =>
                                                handleStudyMaterialNameChange(matIndex, e.target.value)
                                            }
                                            className="flex-1 border border-gray-300 rounded focus:outline-none px-3 py-2"
                                        />

                                        <div className="flex flex-col space-y-1">
                                            {/* File Upload */}
                                            <input

                                                type="file"
                                                name="courseStudyMaterials"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                    handleStudyMaterialFileChange(matIndex, e.target.files[0])
                                                }
                                                className="bg-gray-900 hover:bg-green-900 duration-300 text-white cursor-pointer rounded focus:outline-none px-2 py-[8px]"
                                            />

                                            {/* Show Existing File (only if it’s a string, not a File object) */}
                                            <a
                                                href={studyMaterials}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                📄 View Existing File
                                            </a>


                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                        <button
                            onClick={addStudyMaterial}
                            type="button"
                            className="bg-gray-950 mb-5 text-white py-2 hover:bg-green-900 duration-300 cursor-pointer px-3 rounded"
                        >
                            + Add Study Material
                        </button>

                        {/* Description Points */}
                        <div className="p-5 border border-gray-200 rounded">
                            <h4 className="font-semibold mb-2">
                                Description Points (What will be learned)
                            </h4>


                            {whatYouLearnPoints.map((wPoints, wIndex) => {
                                console.log(wPoints)
                                return (
                                    <div key={wIndex} className="mb-4 flex items-center gap-3">
                                        <input

                                            type="text"
                                            name="courseLearnPoints[]"
                                            value={wPoints}
                                            onChange={(e) => handleWhatYouLearnChange(wIndex, e.target.value)}
                                            placeholder={`Point ${wIndex + 1}`}
                                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2"
                                        />
                                        <span onClick={() => DeleteWhatYouLearnPoints(editId, wIndex)} className="bg-white border border-gray-950 text-black cursor-pointer  hover:text-white hover:bg-gray-950 duration-300 rounded py-2 px-3 text-[23px]"><MdDelete /></span>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            onClick={addWhatYouLearn}
                            type="button"
                            className="bg-gray-950 hover:bg-green-900 text-white px-3 py-2 rounded cursor-pointer duration-300 my-4"
                        >
                            + Add Points
                        </button>
                    </section>

                    {/* FAQ Section */}
                    {/* value={wPoints}
                    onChange={(e) => handleWhatYouLearnChange(wIndex, e.target.value)} */}
                    <section>
                        <h3 className="text-2xl font-semibold mb-4">FAQs</h3>

                        {courseFaqsQuestions?.map((FaqQuestion, index) => (
                            <div key={index} className="mb-4">
                                <label className="block mb-1 font-semibold">Question</label>
                                <input
                                    placeholder="Enter Question"
                                    type="text"
                                    name="courseFaqsQuestions[]"
                                    value={courseFaqsQuestions[index]}
                                    onChange={(e) => handleFaqQuestionChange(index, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-2"
                                />

                                <label className="block mb-1 font-semibold">Answer</label>
                                <textarea

                                    name="courseFaqsAnswer[]"
                                    placeholder="Enter Answer"
                                    value={courseFaqsAnswer[index]}
                                    onChange={(e) => handleFaqAnswerChange(index, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2"
                                    rows={2}
                                />
                            </div>
                        ))}

                        <span
                            onClick={addFaq}
                            type="button"
                            className="bg-gray-950 duration-300 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
                        >
                            + Add FAQ
                        </span>
                    </section>
                </div >
                <button className=" py-3 px-10 bg-gray-950 cursor-pointer text-white rounded-[5px] hover:bg-green-900 duration-300 text-xl">
                    {editId ? 'Update online Course' : 'Add online Course'}
                </button>
            </form >
        </>

    );
}

export function ViewOnlineCourse({ apiBaseUrl, setActiveTab }) {
    const [onlineCourseData, setOnlineCourseData] = useState([])
    const [staticPath, setStaticPath] = useState('')
    const editId = window.location.hash.replace('#', '');



    const fetchOnlineCourseData = () => {
        axios.get(`${apiBaseUrl}/course/view-online`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    setOnlineCourseData(finalRes.onlineCourseData)
                    setStaticPath(finalRes.staticPath)

                }
            })
    }

    useEffect(() => {
        fetchOnlineCourseData()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Available online Courses</h1>

                <div className="grid grid-cols-2 gap-10">
                    {onlineCourseData.map(course => (

                        <div key={course._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm capitalize">
                            <img src={staticPath + course.courseImage} alt={course.courseName} className="w-full h-[400px] object-cover object-top" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                                <p className="text-sm text-gray-700 mb-4">{course.cousreHeadline}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">{course.coursePrice}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full ">
                                    <button onClick={() => {
                                        window.location.hash = course._id;
                                        setActiveTab('online-course');
                                    }}
                                        className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-800 duration-300">Edit</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export function OfflineCourse({ apiBaseUrl }) {



    const [courseFaqsQuestions, setCourseFaqQuestions] = useState([])

    const [courseFaqsAnswer, setCourseFaqsAnswer] = useState([])


    const [courseName, setCourseName] = useState("");

    const [courseAbout, setCourseAbout] = useState("");

    const [cousreHeadline, setCousreHeadline] = useState([])

    const [coursePrice, setCoursePrice] = useState("");

    const [coursePoints, setCoursePoints] = useState(["", "", ""]);


    const editId = window.location.hash.replace('#', '');

    const [staticPath, setStaticPath] = useState('')

    const [categoryName, setCategoryName] = useState('')

    const [previewImage, setPreviewImage] = useState("/previewimg.webp");

    const [courseBannerImgPreview, setCourseBannerImgPreview] =
        useState("/previewimg.webp");

    const [courseHeroImgPreview, setCourseHeroImgPreview] =
        useState("/previewimg.webp");


    const [categoryData, setCategoryData] = useState([])



    const addDescriptionPoint = () => {
        setCoursePoints([...coursePoints, ""]);
    };




    const handleFaqQuestionChange = (index, value) => {
        const updated = [...courseFaqsQuestions];
        updated[index] = value;
        setCourseFaqQuestions(updated);
    };

    const handleFaqAnswerChange = (index, value) => {
        const updated = [...courseFaqsAnswer];
        updated[index] = value;
        setCourseFaqsAnswer(updated);
    };



    const handleCoursePointsChange = (index, value) => {
        const updated = [...coursePoints]
        updated[index] = value
        setCoursePoints(updated)

    }


    const addFaq = () => {
        setCourseFaqQuestions([...courseFaqsQuestions, ""]);
        setCourseFaqsAnswer([...courseFaqsAnswer, ""])
    };


    // useEffect(() => {
    //     if (editId) {
    //         axios.get(`${apiBaseUrl}/category/fetch-category-by-id-offline/${editId}`)
    //             .then((res) => res.data)
    //             .then((finalRes) => {
    //                 console.log(finalRes)
    //             })
    //     }
    // }, [editId])


    const DeleteCoursePoints = (editId, cIndex) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'white',
            iconColor: 'black',
            color: 'black'
        }).then((res) => {
            if (res.isConfirmed) {
                // Now send the request only if confirmed
                axios.post(`${apiBaseUrl}/course/delete-offline-course-points/${editId}`, { cIndex })
                    .then((response) => {
                        const finalRes = response.data;
                        if (finalRes.status === 1) {
                            console.log(finalRes.updatedPoints)
                            setCoursePoints(finalRes.updatedPoints);
                            Swal.fire({
                                title: 'Point Deleted Successfully!',
                                icon: 'success',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black',
                                timer: 1500,
                                showConfirmButton: true,
                                confirmButtonColor: 'black'
                            });
                        } else {
                            Swal.fire({
                                title: 'Something went wrong!',
                                text: 'Please save the course before deleting.',
                                icon: 'error',
                                background: 'white',
                                iconColor: 'black',
                                color: 'black'
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Server error occurred while deleting the point.',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        });
                    });
            }
        });
    };


    useEffect(() => {
        if (editId) {
            axios
                .get(`${apiBaseUrl}/course/edit-course-offline/${editId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes)
                    if (finalRes.status === 1) {
                        const course = finalRes.findCourseById;
                        const staticPath = finalRes.staticPath;

                        setStaticPath(staticPath);
                        // ✅ Set basic fields
                        setCourseName(course.courseName || "");
                        setCousreHeadline(course.cousreHeadline || "");
                        setCourseAbout(course.courseAbout || "");
                        setCoursePrice(course.coursePrice || "");
                        setCategoryName(course.courseCategory || "");
                        // ✅ Set images
                        setPreviewImage(staticPath + course.courseImage);
                        setCourseBannerImgPreview(staticPath + course.courseBannerImage);
                        setCourseHeroImgPreview(staticPath + course.courseHeroImage);

                        // ✅ Set description points
                        if (Array.isArray(course.coursePoints)) {
                            setCoursePoints(course.coursePoints);
                        }

                        // ✅ Set What You Learn points
                        if (Array.isArray(course.courseLearnPoints)) {
                            setWhatYourLearnPoints(course.courseLearnPoints);
                        }


                        if (Array.isArray(course.courseFaqsQuestions)) {
                            setCourseFaqQuestions(course.courseFaqsQuestions);
                        }
                        if (Array.isArray(course.courseFaqsAnswer)) {
                            setCourseFaqsAnswer(course.courseFaqsAnswer);
                        }

                    }
                });
        }
    }, [editId]);



    const addOfflineCourse = (event) => {
        event.preventDefault();
        const allData = new FormData(event.target);

        if (editId) {
            //update course
            axios.post(`${apiBaseUrl}/course/update-course-offline/${editId}`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Course Updated Successfully',
                            text: 'Course details updated.',
                            icon: 'success',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                })
        }
        else {
            axios
                .post(`${apiBaseUrl}/course/add-offline`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Course Added Successfully !',
                            text: 'New course added in online courses.',
                            icon: 'success',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                        // .then((res) => {
                        //     window.location.reload();
                        // })
                    }
                    else if (finalRes.status == 2) {
                        Swal.fire({
                            title: 'Course Already Exist',
                            text: 'This course Name is Already Exist.',
                            icon: 'warning',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Something Went Wrong',
                            text: 'Try again later',
                            icon: 'error',
                            background: 'white',
                            iconColor: 'black',
                            color: 'black'
                        })
                    }
                });
        }


    };

    const addCategory = (event) => {
        event.preventDefault();
        axios.post(`${apiBaseUrl}/category/add-offline-category`, { categoryName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: 'Category Added Successfully ',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'success'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    })
                }
                else if (finalRes.status == 2) {
                    Swal.fire({
                        title: 'Category already Exist ! ',
                        text: 'try another One',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'warning'
                    })
                }
                else {
                    Swal.fire({
                        title: 'Something went wrong ! ',
                        text: 'try again later',
                        background: 'white',
                        color: 'black',
                        iconColor: 'black',
                        icon: 'error'
                    })
                }
            })
    }

    const fetchCategory = () => {
        axios.get(`${apiBaseUrl}/category/view-offline-category`)
            .then((res) => res.data)
            .then((finalRes) => {
                setCategoryData(finalRes.categoryData)
            })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>
            <form onSubmit={addCategory} className="bg-white shadow-sm p-5 rounded border border-gray-50" >
                <label className="block mb-1 font-semibold ">Add New Category</label>
                <input
                    required
                    onChange={(e) => setCategoryName(e.target.value)}
                    name="courseCategory"
                    placeholder="Ug Exams"
                    type="text"
                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                />
                <button className="bg-gray-950  hover:bg-green-900 duration-300 px-3 py-2 rounded cursor-pointer text-white">+Add Category</button>
            </form>
            <form onSubmit={addOfflineCourse}>

                <div className="max-w-6xl mx-auto p-6 shadow-sm bg-white border border-gray-100 rounded-md my-8">

                    <h2 className="text-3xl font-bold mb-6">Add New Offline Course</h2>

                    {/* Course Basic Info */}
                    <section className="mb-8">
                        <label className="block mb-1 font-semibold">Select Category</label>
                        <select
                            disabled={editId}
                            onChange={(e) => e.target.value}
                            name="courseCategory"
                            placeholder="Nid ug course"
                            type="text"
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        >
                            <option>Select Category</option>

                            {categoryData.map((cat, catInd) => {
                                return (
                                    <option value={cat._id} key={catInd}>{cat.categoryName}</option>
                                )
                            })}
                        </select>


                        <label className="block mb-1 font-semibold">Course Name</label>
                        <input
                            name="courseName"
                            placeholder="Nid ug course"
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        />

                        <div className="my-5">
                            <p className=" block mb-1 font-semibold">Course Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded max-w-[300px] max-h-[250px]"
                                    src={previewImage}
                                />

                                <input

                                    name="courseImage"
                                    onChange={(e) =>
                                        setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>

                        <label className="block mb-1 font-semibold">Course Headline</label>
                        <input

                            name="cousreHeadline"
                            placeholder="Designing Expert course"
                            type="text"
                            value={cousreHeadline}
                            onChange={(e) => setCousreHeadline(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                        />

                        <label className="block mb-1 font-semibold">About Course</label>
                        <textarea

                            name="courseAbout"
                            placeholder="An Exellent Mentorship with the best guidance"
                            value={courseAbout}
                            onChange={(e) => setCourseAbout(e.target.value)}
                            className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                            rows={3}
                        ></textarea>

                        <div className="my-5">
                            <p className="block mb-1 font-semibold">Course Banner Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded max-w-[300px] max-h-[300px]"
                                    src={courseBannerImgPreview}
                                />
                                <input

                                    name="courseBannerImage"
                                    onChange={(e) =>
                                        setCourseBannerImgPreview(
                                            URL.createObjectURL(e.target.files[0])
                                        )
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>

                        <label className="block mb-1 font-semibold">Course Points</label>
                        {coursePoints.map((point, i) => (
                            <div key={i} className="mb-4 flex items-center gap-3">
                                <input

                                    name="coursePoints"
                                    key={i}
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleCoursePointsChange(i, e.target.value)}
                                    className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 "
                                    placeholder={`Point ${i + 1}`}
                                />
                                <span onClick={() => DeleteCoursePoints(editId, i)} className="bg-white border border-gray-950 rounded py-2 px-3 hover:bg-gray-950 hover:text-white duration-300 cursor-pointer text-[23px]"><MdDelete /></span>
                            </div>
                        ))}
                        <button

                            onClick={addDescriptionPoint}
                            type="button"
                            className="bg-gray-950 text-white hover:bg-green-900 duration-300 px-3 cursor-pointer py-2 rounded mb-4"
                        >
                            + Add Point
                        </button>

                        <label className="block mb-1 font-semibold">Course Price (₹)</label>
                        <input
                            name="coursePrice"
                            type="number"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            placeholder="4999"
                            className="w-32 border border-gray-300 rounded focus:outline-none px-3 py-2 mb-4"
                            min="0"
                        />

                        <div className="my-5">
                            <p className="block mb-1 font-semibold">Course Hero Image </p>
                            <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">
                                <img
                                    className="object-cover mb-5 rounded min-w-[300px] max-h-[300px]"
                                    src={courseHeroImgPreview}
                                />
                                <input

                                    name="courseHeroImage"
                                    onChange={(e) =>
                                        setCourseHeroImgPreview(
                                            URL.createObjectURL(e.target.files[0])
                                        )
                                    }
                                    type="file"
                                    className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </section>



                    {/* FAQ Section */}
                    <section>
                        <h3 className="text-2xl font-semibold mb-4">FAQs</h3>

                        {/* FAQ Section */}
                        <section>

                            {courseFaqsQuestions.map((FaqQuestion, index) => (
                                <div key={index} className="mb-4">
                                    <label className="block mb-1 font-semibold">Question</label>
                                    <input

                                        placeholder="Enter Question"
                                        type="text"
                                        name="courseFaqsQuestions[]"
                                        value={courseFaqsQuestions[index]}
                                        onChange={(e) => handleFaqQuestionChange(index, e.target.value)}
                                        className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2 mb-2"
                                    />

                                    <label className="block mb-1 font-semibold">Answer</label>
                                    <textarea

                                        name="courseFaqsAnswer[]"
                                        placeholder="Enter Answer"
                                        value={courseFaqsAnswer[index]}
                                        onChange={(e) => handleFaqAnswerChange(index, e.target.value)}
                                        className="w-full border border-gray-300 rounded focus:outline-none px-3 py-2"
                                        rows={2}
                                    />
                                </div>
                            ))}

                            <span
                                onClick={addFaq}
                                type="button"
                                className="bg-gray-950 duration-300 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer"
                            >
                                + Add FAQ
                            </span>
                        </section>

                    </section>
                </div>
                <button className=" py-3 px-10 bg-gray-950 cursor-pointer text-white rounded-[5px] hover:bg-green-900 duration-300 text-xl">
                    Add offline Course
                </button>
            </form>
        </>

    );
}



export function ViewOfflineCourse({ apiBaseUrl, setActiveTab }) {
    const editId = window.location.hash.replace('#', '');
    const [offlineCourseData, setOfflineCourseData] = useState([])
    const [staticPath, setStaticPath] = useState([])
    console.log(editId)

    const fetchOnlineCourseData = () => {
        axios.get(`${apiBaseUrl}/course/view-offline`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    setOfflineCourseData(finalRes.offlineCourseData)
                    setStaticPath(finalRes.staticPath)
                }
            })
    }

    useEffect(() => {
        fetchOnlineCourseData()
    }, [])


    return (
        <>
            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Available online Courses</h1>

                <div className="grid grid-cols-2 gap-10">
                    {offlineCourseData.map(course => (

                        <div key={course._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm capitalize">
                            <img src={staticPath + course.courseImage} alt={course.courseName} className="w-full h-[400px] object-cover object-top" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                                <p className="text-sm text-gray-700 mb-4">{course.cousreHeadline}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">{course.coursePrice}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full ">
                                    <button onClick={() => {
                                        window.location.hash = course._id;
                                        setActiveTab('offline-course');
                                    }}
                                        className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-800 duration-300">Edit</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}



