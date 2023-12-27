import React from 'react'

export default function MainApplication() {
    const navigation = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigation('/home')
        } else {
            navigation('/login')
        }
    });
}
