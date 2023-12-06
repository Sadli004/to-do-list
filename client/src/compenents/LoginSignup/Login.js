
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
export const Login = () => {
    
    return (
        <div>
            <div className="header">
                <div className="text">LOGIN</div>
                <div className="underline"></div>
            </div>
            <form>
                <div className="inputs">
                    <div className="input" >
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email' />
                    </div>
                    <div className="input" >
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' />
                    </div>
                </div>  
                <div className="submit-container">
                    <button className="submit" type="submit">Submit</button>
                </div>
            </form>
                <div className="forgot-password">Forgot your password ? <span>Click Here!</span></div>
        </div>
    )
}