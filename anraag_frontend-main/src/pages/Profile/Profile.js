import React,{useState,useEffect} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { adminData } from '../../data/Data'
import user from '../../assets/user.png'

export default function ProfilePage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDd, setShowDd] = useState(false);
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            let headers = new Headers();
            headers.set('Content-type', 'application/json');
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
                mode: 'cors',
                headers: headers
            });

            localStorage.removeItem("refreshToken")
            navigate('/login')

        } catch (error) {
            setError('Error connecting to the server');
        }
    }
    const toggleDd = () => {
        setShowDd((prevState) => !prevState)
    }
    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState)
    }
    // console.log(showSidebar)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = new Headers();
                headers.set("Authorization", "Bearer " + localStorage.getItem("accessToken"))

                const response = await fetch('http://localhost:8080/getUser', {
                    method: 'GET',
                    mode: 'cors',
                    headers: headers
                });
                const tab = await response.json()

                if (tab.success) {
                    console.log(tab.user)
                }
                
            } catch (error) {
                setError('Error connecting to the server');
            }
        };

        fetchData();
    }, [])
  return (
      <section style={{ backgroundColor: '#eee' }}>
          <div>
                <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />
            </div>
           
          <MDBContainer className="py-4">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4"style={{ height: '36vh' }}>
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px', paddingBottom:'30px'  }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Roll No.</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">2001030</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Course</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">B.Tech CSE 2020</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="14" >
                <MDBCard className="mb-4 mb-md-0" >
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"></span> Progress</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Course</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={40} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Tuition Fee</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Hostel Rent</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mess Dues</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Library and Other Fines</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

            </MDBRow>
            <MDBRow>
            <div className="d-flex flex-row-reverse mb-4" style={{paddingTop:'20px',marginRight:'20px'}}>
                  <MDBBtn className="ms-1" onClick={logoutHandler}>Logout</MDBBtn>
                  <MDBBtn outline className="ms-1" onClick={() => { window.location.pathname = "/update"; }} >Update Password</MDBBtn> 
                </div>
            </MDBRow>
          </MDBCol>
        </MDBRow>
          </MDBContainer>
          {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
<SideMenu  data={adminData} openSidebar={toggleSidebar} sidebar={showSidebar} />
    </section>
  );
}