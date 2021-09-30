import React,{useContext} from 'react';
import Styles from '../contact/contact.module.css';
import location from '../assets/contactLogo/location.png';
import phone from '../assets/contactLogo/telephone.png';
import email from '../assets/contactLogo/email.png';
import instagram from '../assets/contactLogo/instagram.png';
import { Link } from 'react-router-dom';
import { MyContext } from '../contextApi/context';

const Contact=(props)=>{

    const Context=useContext(MyContext);

    function submitContact(value){
{Context.NotifyUserSubmitContact(value)}
    }

    return(
        <div>
            <div className={Styles.outerdiv}>
                <div className={Styles.innerdiv1}>
                    <div className={Styles.locationdiv}>
                        <img src={location}/>
                        <h3>Our Main Office</h3>
                        <p>Random Street,no.007,Random City,Italy</p>
                    </div>
                    <div className={Styles.phonediv}>
                        <img src={phone} />
                        <h3>Phone Number</h3>
                        <p>234-654-9666</p>
                        <p>888000888(Toll Free)</p>
                        </div>
                    <div className={Styles.emaildiv}>
                        <img src={email} />
                        <h3>Email</h3>
                        <p>NordStrom@shop.com</p>
                        </div>
                    <div className={Styles.instagramdiv}>
                        <img src={instagram} />
                        <h3>Social Media:</h3>
                        <p>@NordStrom</p>
                        </div>
                </div>
                <div className={Styles.innerdiv2}>
                    <div className={Styles.contactdiv}>
                        <h1>Contact-Us</h1>
                        <input className={Styles.firstInput} placeholder='Please Enter Your Name.' type='text' />
                        <input className={Styles.secondInput} placeholder='Please Enter Your Valid Email Address.' type='email' required />
                        <textarea placeholder='Please Type Your message Here.' rows="8" cols="40"></textarea>
                        <Link to='/'>
                            <button onClick={submitContact} type='submit'> Submit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;