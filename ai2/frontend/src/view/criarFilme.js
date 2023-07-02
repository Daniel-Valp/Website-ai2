import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React ,{useEffect, useState} from "react";
import axios from 'axios';

const baseUrl = "http://localhost:3001";

export default function CreateFilme(){
    
    const [Titulo, setTitulo] = useState("");
    const [photo, setphoto] = useState("");
    const [Genero, setGenero] = useState("");
    const [description, setdescription] = useState("");
    const [dataGenero, setdataGenero] = useState([]);
    const [campPhoto, setcampPhoto] = useState(null);



    useEffect(() => {
        const url = baseUrl + "/genero/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenero(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        })
    }, []);
    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Titulo</label>
                    <input type="text" className="form-control" placeholder="Titulo"
                    value={Titulo} onChange={(value)=>
                        setTitulo(value.target.value)}/>
                </div>

            </div>
            <div className="form-group">
                <label htmlFor="inputAddress">Photo</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="FileName.jpg"
                    value={campPhoto}
                    onChange={value => setcampPhoto(value.target.value)}
                />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Genero</label>
                    <select id="inputState"
                    className="form-control" value = {Genero}
                    onChange={(value) => setGenero(value.target.value)}>
                        <option defaultValue>Selecione..</option>
                        <LoadGenero/>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Descriçao:</label>
                    <input type="text" className="form-control" placeholder="description"
                    onChange={value =>
                        setdescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendSave()}>Adicionar filme</button>
        </div>
    )

    function LoadGenero(){
        return dataGenero.map((data, index) => {
            return(
                <option key={index} value ={data.id}>{data.description}</option>
        )
        })
    }

    function SendSave(){ 
        
        if (Genero === "") {
            alert("Selecione um genero!")
        }
        else if (Titulo === "") {
            alert("Escolhe um titulo!")
        }/*
        else if (photo === "") {
            alert("Insira uma foto!")
        }*/
        else if (description === "") {
            alert("Escreva uma descriçao")
        }
        else {
            const url = baseUrl + "/filmes/create"
            const datapost = {
                
                titulo: Titulo,
                photo: photo,
                generoId: Genero,
                description: description,
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
            });
            console.log("Saving...");
        }
    }
}