import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/Firebase'; // Import your Firebase configuration
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore'
import NaviagateLink from '../../components/NavigateLink/NaviagateLink.component';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
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
