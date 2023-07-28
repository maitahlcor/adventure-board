import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gameRole: false,
        game_role: "player",
        game_interest: "master",
        url: "",
        about: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Role</label>
                        <div className="multiple-input-container">
                            <input
                                id="master-game_role"
                                type="radio"
                                name="game_role"
                                value="master"
                                onChange={handleChange}
                                checked={formData.game_role === "master"}
                            />
                            <label htmlFor="master-game_role">master</label>
                            <input
                                id="player-game_role"
                                type="radio"
                                name="game_role"
                                value="player"
                                onChange={handleChange}
                                checked={formData.game_role === "player"}
                            />
                            <label htmlFor="player-game_role">player</label>
                            <input
                                id="more-game_role"
                                type="radio"
                                name="game_role"
                                value="more"
                                onChange={handleChange}
                                checked={formData.game_role === "more"}
                            />
                            <label htmlFor="more-game_role">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Role on my Profile</label>

                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gameRole"
                            onChange={handleChange}
                            checked={formData.show_gameRole}
                        />

                        <label>Show Me</label>

                        <div className="multiple-input-container">
                            <input
                                id="master-gender-interest"
                                type="radio"
                                name="game_interest"
                                value="master"
                                onChange={handleChange}
                                checked={formData.game_interest === "master"}
                            />
                            <label htmlFor="master-gender-interest">master</label>
                            <input
                                id="player-gender-interest"
                                type="radio"
                                name="game_interest"
                                value="player"
                                onChange={handleChange}
                                checked={formData.game_interest === "player"}
                            />
                            <label htmlFor="player-gender-interest">player</label>
                            <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="game_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.game_interest === "everyone"}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>

                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="You got my sword..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>
        </>
    )
}
export default OnBoarding
