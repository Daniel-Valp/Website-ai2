import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3001";

export default function UpdateFilme(){

    const [Filme, setFilme] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [photo, setphoto] = useState("");
    const [Genero, setGenero] = useState("");
    const [description, setdescription] = useState("");
    const [dataGenero, setdataGenero] = useState([]);

    const { filmeId } = useParams();

    useEffect(() => {

        const url = baseUrl + "/filmes/get/" + filmeId;
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data[0];
                setFilme(data);
                setTitulo(data.titulo);
                setphoto(data.photo);
                setdescription(data.description);
                setGenero(data.genero.description);
            }
            else{
                alert("Error web service")
            }
        })
        .catch(error => {
            alert("Error server: " +  error)
        })

        const urlgenre = baseUrl + "/genero/list";
        axios.get(urlgenre)
        .then(res => {
            if (res.data.success){
                const data = res.data.data;
                setdataGenero(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        });


    }, [filmeId]);

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Title</label>
                    <input type="text" className="form-control" placeholder="Title"
                    value={Titulo} onChange={(value)=>
                        setTitulo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Insira uma foto:</label>
                    <input type="text" className="form-control" placeholder="Path foto"
                    value={photo} onChange={(value)=>
                        setphoto(value.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Genero</label>
                    <select id="inputState" className="form-control" value = {Genero}
                    onChange={(value)=> setGenero(value.target.value)}>
                        <option default>Genero</option>
                        <LoadFillData/>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">description:</label>
                    <input type="text" className="form-control" placeholder="Description"
                    value={description} onChange={value =>
                        setdescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendUpdate()}>Update</button>
        </div>
    );

    function SendUpdate(){
        const url = baseUrl + "/filmes/update/" + filmeId
        const datapost = {
            titulo : Titulo,
            photo : photo,
            generoId : Genero,
            description : description
        }
        axios.put(url, datapost)
        .then(response=>{
            if (response.data.success === true) {
                alert(response.data.message)
            }
            else {
                alert("Error")
            }
        })
        .catch(error=>{
            alert("Error 34: " + error)
        })
    }

    function LoadFillData(){
        return dataGenero.map((data, index) => {
            return(
            <option key={index} value={data.id}>{data.description}</option>
        )
        });
    }
}