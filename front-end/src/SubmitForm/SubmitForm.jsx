import './SubmitForm.css';

import { useForm } from "react-hook-form";

const SubmitForm = ({ currentLocation }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
      };

	return (
		<div className="App">
            <div>
                <img src="" alt="" />
            </div>
			<form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        {...register("title", {
                            required: "Title is required.",
                            pattern: {
                            value: /abc/,
                            message: "Title is not valid."
                            }
                        })}
                    />
                    {errors.title && <p className='errorMsg'>{errors.title.message}</p>}
                </div>
                <div className="form-control">
                    <label>Description</label>
                    <input
                        type="Description"
                        name="Description"
                        {...register("Description", {
                            required: "Description is required.",
                            minLength: {
                            value: 6,
                            message: "Description should be at least 6 characters."
                            }
                        })}
                    />
                    {errors.password && <p className='errorMsg'>{errors.password.message}</p>}
                </div>
                <div className="form-control">
                    <label>Location</label>
                    <input
                        type="Location"
                        name="Location"
                        {...register("Location", {
                            required: "Location is required."
                        })}
                    />
                    {errors.location && <p className='errorMsg'>{errors.location.message}</p>}
                </div>
                <input type='button'>Use Current Location</input>
                <div className="form-control">
                <label></label>
                <button type="submit">Upload Stoop</button>
                </div>
            </form>
		</div>
	);
};

export default SubmitForm;
