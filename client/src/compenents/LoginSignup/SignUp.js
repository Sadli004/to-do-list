import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
export const SignUp = () => {
    return(
        <div >
            <div className="header">
                <div className="text">SIGN UP</div>
                <div className="underline"></div>
            </div>
            <form>
                <div className="inputs">
                    <div className="input" >
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className="input" >
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className="input" >
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className='submit-container'>
                        <button type='submit' className="submit">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    )
}