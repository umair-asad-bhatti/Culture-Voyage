import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/Firebase'; // Import your Firebase configuration
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore'
import NaviagateLink from '../../components/NavigateLink/NaviagateLink.component';
import EmailVerify from '../../assets/EmailVerify.png'
import strings from '../../constants/Strings'



const EmailVerificationPage = () => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // -> Alert Email Verification
                const onIdTokenChangedUnsubscribe = auth.onIdTokenChanged((user) => {
                    const unsubscribeSetInterval = setTimeout(() => {
                        auth.currentUser.reload();
                        auth.currentUser.getIdToken(/* forceRefresh */ true)
                    }, 10000);

                    if (user && user.emailVerified) {
                        clearInterval(unsubscribeSetInterval) //delete interval
                        setIsEmailVerified(true)
                        updateDoc(doc(db, 'users', user.uid), { emailVerified: user.emailVerified })
                        // -> Go to your screnn
                        return onIdTokenChangedUnsubscribe() //unsubscribe onIdTokenChanged
                    }
                })
            }
        })
    }, [])

    const handleResendVerificationEmail = async () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('email is sent');
            });
    };

    return (
        <div className="min-h-screen flex justify-between">
            
            <div className='w-[50%] bg-accent min-h-screen flex flex-col items-center justify-center'>
                <img src={EmailVerify} width={300} height={300} />
                <h3 className='text-primary text-2xl text-center mt-4'>{strings.EmailVerify}</h3>
            </div>
            
            <div className="p-8 rounded  w-[50%] flex justify-center items-center">
            
                {isEmailVerified ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Email Verified</h2>
                        <NaviagateLink toURL={'/additionalinformation'}>Continue</NaviagateLink>
                        {/* Add a button or link to redirect to the main application */}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
                        <p>Please verify your email before continuing.</p>
                        <button
                            className="mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleResendVerificationEmail}
                        >
                            Resend Verification Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    
    );
};

export default EmailVerificationPage;
