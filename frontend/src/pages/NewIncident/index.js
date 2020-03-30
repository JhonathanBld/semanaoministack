import React from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'; 
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import api from '../services/api'

export default function NewIncident() {
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [value , setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents' , data , {
                headers : {
                    Authorization: ongId
                }
            });

            history.push('/profile')
        } catch (error) {
            
        }
    }

   return (
    <div className="new-incident-container">
    <div className="content">
        <section>
         <img src={logoImg} alt="Logo"/>

         <h1>Cadastrar novo caso</h1>
         <p> Descreva o caso </p>

         <Link className="back-link" to="/profile">
             <FiArrowLeft size={16} color="#E02041"/>
             Voltar para home
         </Link>
        </section>

        <form onSubmit={handleNewIncident}>
             <input type="text" placeholder="Titulo do caso"
             value={title}
             onChange={e => setTitle(e.target.value)}
             />
             <textarea placeholder="Descrição"
             value={description}
             onChange={e => setDescription(e.target.value)}
             />
             <input type="text" placeholder="Valor"
             value={value}
             onChange={e => setValue(e.target.value)}
             />

             
            <button className="button" type="submit"> Cadastrar </button>
         </form>
    </div>
</div>
   );
}