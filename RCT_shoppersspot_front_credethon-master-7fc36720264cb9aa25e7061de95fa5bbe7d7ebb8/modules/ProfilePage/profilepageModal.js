// import React from 'react'
// import useForm from 'react-hook-form'

// // import './Modal.css';

// const apps = () => {
//     const { register, handleSubmit, errors } = useForm() // initialise the hook
//     const onSubmit = (data) => {
//          console.log('*************************************************',data) 
//       } // callback when validation pass
         
//           return (
//             <div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <input name="firstname" ref={register} /> {/* register an input */}
        
//               <input name="lastname" ref={register({ required: true })} /> {/* apply required validation */}
//               {errors.lastname && 'Last name is required.'} {/* error message */}
        
//               <input name="age" ref={register({ pattern: /\d+/ })} /> {/* apply a Refex validation */}
//               {errors.age && 'Please enter number for age.'} {/* error message */}
        
//               <input type="submit" />
//             </form>
//             </div>
//           )
//         // }
        
//     // )
// }

// export default apps;
