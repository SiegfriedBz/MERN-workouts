import { useState } from 'react'

const initUser = { email: '', password: ''}

const UserForm = ({ path: action, onSubmit, isLoading }) => {
    const [user, setUser ] = useState(initUser)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user.email || !user.password){
            alert("Please fill all fields")
        }
        await onSubmit(user)
        setUser(initUser)
    }

    return(
        <form
            onSubmit={handleSubmit}>
            <h4>{action}</h4>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
            />
            <button
                className=''
                type='submit'
                disabled={isLoading}
            >Submit
            </button>
        </form>
    )
}

export default UserForm
