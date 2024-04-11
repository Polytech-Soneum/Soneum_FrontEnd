import './gender_toggle.scss';

function GenderToggle() {
    const male_voice_select = () => {
        const toggle_value = document.getElementsByClassName("gender_toggle_circle")[0];

        if(toggle_value.classList.value.split(" ").includes("gender_toggle_circle_moving_right")) {
            toggle_value.classList.remove("gender_toggle_circle_moving_right");
        }

        toggle_value.classList.add("gender_toggle_circle_moving_left");
    }

    const female_voice_select = () => {
        const toggle_value = document.getElementsByClassName("gender_toggle_circle")[0];

        if(toggle_value.classList.value.split(" ").includes("gender_toggle_circle_moving_left")) {
            toggle_value.classList.remove("gender_toggle_circle_moving_left");
        }

        toggle_value.classList.add("gender_toggle_circle_moving_right");
    }

    return (
        <div>
            <div className="gender_toggle">
                <div className="gender_toggle_button" onClick={male_voice_select}> 남 </div>
                <div className="gender_toggle_button" onClick={female_voice_select}> 여 </div>
                <div className="gender_toggle_circle"></div>
            </div>
        </div>
    );
}

export default GenderToggle;

