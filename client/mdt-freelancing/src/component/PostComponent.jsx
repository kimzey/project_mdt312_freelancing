import "./PostComponent.css"
import { useParams ,useNavigate } from "react-router-dom";
import {getUser} from "../services/auth"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Navbar from "./NavbarComponent";
import axios from "axios";
import { useState,useEffect} from "react";
import Swal from "sweetalert2"

export default function PostCompornent() {
    const navigate = useNavigate();
    const param = useParams()

    const [login_user,Setlogin_user] = useState(getUser())

    const [user,setUser] = useState()
    const [category,setCategory] = useState('')
    const [author,setAuthor] = useState('')
    const [content,setContent] = useState()
    const [content_img,setContent_img] = useState({})

    useEffect(()=>{
        if(login_user !== false && user == undefined){
            axios.get(`http://localhost:5050/api/user/${login_user}`)
            .then((response) => {
                setUser(response.data)
                setCategory(param.category)
            })
            .catch(err=>{
                alert(err)
            })
        }
        
    },[])

    const setWrite = (e)=>{
        setContent(e)
        setAuthor(user.username)
    }

    const set_img = (e)=>{
        setContent_img(e.target.files[0])
    }

    const submmit_form = (e)=>{
        e.preventDefault();
        console.log(content_img);

        axios.post(`http://localhost:5050/api/post/create`,{content,author,category})
        .then((response) => {
            const res_slut = response.data.slug
            console.log(res_slut)
            axios.put(`http://localhost:5050/api/post/updatimg/${res_slut}`,{content_img}, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                console.log(response);
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: "บันทึกข้อมูลเรียบร้อย",
                    icon: "success"
                  });
            })
            .catch(err=>{
                console.log(err)
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: err,
                    icon: "error"
                  });
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (<>
        <Navbar></Navbar>
        <div className="post">

            <div className="post_container">

                <div className="box" id="title">
                    <h1>topic : {JSON.stringify(param.category)}</h1>
                </div>

                <div id="write_box" className="box">
                    <div className="title_box">
                    {user && <> <img src={`http://localhost:5050/img_user/${user.name_img||"avatar.png"}`} id="profile_img" onClick={()=>navigate(`/profile/${user.username}`)}></img></>}
                        <h1>Name</h1>
                    </div>
                    
                    <form id="write" onSubmit={submmit_form} >  
                        <ReactQuill them="snow"  
                            placeholder="เขียนรายละเอียดบทความ"
                            style={{border: '1px solid #6666'}} onChange={setWrite}/>
                            <div className="btn_write_box">
                                <input type="file" id="post_img" name="content_img" accept="image/*" className="btn btn_img" onChange={set_img} />
                                <input type="submit" value="submit" className="btn btn_submit"  ></input>
                            </div>
                    </form>

                </div>

                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="profile_img" ></img>
                        <h1>Name</h1>
                    </div>
                    <div className="content">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="contnet_img" ></img>
                        <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec magna vitae magna laoreet fermentum. Nam vel scelerisque diam, vitae commodo neque. Curabitur id efficitur justo. Donec sed sapien ornare, tincidunt risus hendrerit, euismod urna. Sed porttitor pellentesque tincidunt. Duis sit amet iaculis nibh. Nulla vel mauris eros. Sed hendrerit ligula a mauris volutpat iaculis. Curabitur leo lorem, maximus eu tortor a, fermentum congue libero. Nullam felis augue, finibus et est ut, porttitor vulputate risus. Fusce dignissim nunc in tincidunt tristique. Vestibulum tortor elit, porttitor eget imperdiet a, efficitur nec tortor. Morbi ullamcorper ante sed nunc hendrerit sagittis. Vestibulum in commodo risus. Quisque non lorem dui.

                        Praesent sapien est, commodo nec ante in, vulputate ullamcorper nisi. Integer maximus nulla quis aliquam tincidunt. Morbi nibh leo, pretium eget blandit at, placerat at eros. Pellentesque quis dapibus augue, id rhoncus nulla. Vestibulum volutpat augue sit amet faucibus vestibulum. Maecenas sed quam libero. Fusce posuere massa a pretium rhoncus. Donec lacinia est ullamcorper sollicitudin accumsan. Integer at porta metus, eget consequat lectus. Quisque vehicula scelerisque orci, in porta libero lacinia sit amet. Etiam finibus tellus nec diam interdum venenatis. Praesent ac mauris a erat vulputate iaculis mollis iaculis elit. Pellentesque vehicula sollicitudin metus vitae efficitur. Sed vulputate non elit at pellentesque. Nullam imperdiet felis at ligula imperdiet iaculis. Aenean laoreet arcu nec sem porta malesuada.

                        Praesent fringilla ante tempus nisl sagittis pulvinar. In a nibh in elit aliquam lobortis. Mauris egestas, metus a malesuada congue, diam ligula bibendum nulla, vitae consectetur nunc sapien a nibh. Integer nec orci sodales, varius ante consectetur, posuere enim. Mauris eleifend nulla ut orci pulvinar tristique. Nulla nec ultricies lectus. Praesent dapibus ornare elit, id accumsan sem ultricies eget. In eu viverra nisl. Donec vitae suscipit lorem, eu eleifend risus. Nulla interdum in nunc non viverra. Nunc ut ante sed eros commodo aliquam. Ut vel volutpat nunc. Vivamus cursus vehicula quam, a semper felis convallis eu. Integer volutpat dapibus rutrum.

                        Vivamus dapibus neque libero, ac tristique elit sollicitudin eget. Curabitur eget blandit mi. Nam quis fermentum ligula, eu convallis ex. Sed tincidunt dapibus semper. Sed libero lacus, ultricies non nisi ut, gravida blandit turpis. Morbi finibus nec nisi nec convallis. Proin sed felis sit amet magna semper tempor id non nisl. Phasellus iaculis urna sed sem varius, vel pulvinar nisl imperdiet. Vivamus dolor nisi, convallis ac faucibus non, euismod et justo. Etiam accumsan nisl velit, et ornare nibh dignissim a. Pellentesque nulla sapien, semper sit amet nulla at, tristique elementum erat. Fusce et turpis sapien. Maecenas et condimentum odio, quis ultricies risus. Etiam velit neque, pellentesque et sodales nec, mattis ut mi. Nam sed tempor elit.

                        Vivamus aliquet dolor nec dapibus faucibus. Morbi at turpis ex. Integer aliquam, ante a semper egestas, justo dui tincidunt nisl, vitae lacinia lorem nisl in eros. Ut sit amet magna maximus, mattis ex at, ornare mauris. Duis iaculis finibus rhoncus. Praesent eget ullamcorper mauris, sit amet placerat risus. Duis iaculis sollicitudin ipsum. Cras vitae nulla eu nunc semper maximus eget vitae nunc. Nulla molestie nibh ac ex ultricies, vitae sagittis quam semper. Vivamus volutpat condimentum risus. Morbi vehicula, quam eu consequat consectetur, odio velit facilisis risus, nec auctor ex nunc vitae sapien.</p>
                    </div>
                </div>

            </div>

        </div>
  </>)
}