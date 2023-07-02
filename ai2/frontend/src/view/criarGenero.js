import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React ,{useEffect, useState} from "react";

const baseUrl = "http://localhost:3001";

export default function CreateGenero(){

    const [description, setdescription] = useState("");

    return(
        <div>
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-6'>
                    <label htmlFor="inputPassword4">Descriçao:</label>
                    <input type="text"
                    className="form-control"
                    placeholder=""
                    value={description} onChange={value=>
                        setdescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={SendSave}>Add</button>
        </div>
    );

    function SendSave(){
        if (description === "") {
            alert("adicione uma descriçao!")
        }
        else {
            const url = baseUrl + "/genero/create"
            const datapost = {
                description : description
            }
            axios.post(url, datapost)
            .then(response => {
                if (response.data.success===true) {
                        alert(response.data.message)
                }
                else {
                        alert(response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 " + error)
            })
        }
    }
}