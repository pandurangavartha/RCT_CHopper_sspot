import React from 'react'
import loading_animation from '../assets/images/loading-spinner.svg'
import './loading.module.css'
export default function index() {
  console.log('{{{{{{{{{{{{{',localStorage.getItem('loading'))
  return (
    <div className="loading_background" >
      <img src={loading_animation} className="svg" alt="" />
      <span style={{'paddingLeft':'4px','marginTop':'4%','fontWeight':"bold"}}>Loading...</span>
    </div>
  )
}

// import React from 'react'
// import loading_animation from '../assets/images/loading-spinner.svg'
// import './loading.module.css'

// export default class Gallery extends React.Component {
//   // export default function index() {
//   // console.log(this.props.loader)
//   constructor(props) {
//     super(props);
//     this.state = {
//       loader: true
//     }
//   }
//   return() {
//     return (
//       <div className="loading_background" >
//         <img src={loading_animation} className="svg" alt="" />
//       </div>
//     )
//   }
// }

