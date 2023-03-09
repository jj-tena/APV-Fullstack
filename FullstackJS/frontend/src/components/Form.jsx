import { useState, useEffect } from 'react';
import Alert from './Alert';
import usePatients from '../hooks/usePatients';

const Form = () => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const {savePatient, patient} = usePatients();

    useEffect(() => {
        if(Object.keys(patient).length){
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setDate(patient.date);
            setSymptoms(patient.symptoms);
            setId(patient._id)
        }
    }, [patient])

    const handleSubmit = (e) => {
        e.preventDefault();
        if([name, owner, email, date, symptoms].includes('')){
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return
        }
        savePatient({
            name,
            owner,
            email,
            date,
            symptoms,
            id
        });
        setAlert({msg: 'Guardado correctamente', error: false});
        setName('');
        setOwner('');
        setEmail('');
        setDate('');
        setSymptoms('');
        setId(null);
    }

    const {msg} = alert;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className="text-xl text-center mb-10 mt-5">
            Añade tus pacientes y {' '}
            <span className="text-indigo-600 font-bold">
                Adminístralos
            </span>
        </p>
        
        <form
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md
            rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    htmlFor="name" 
                    className="text-gray-700 uppercase font-bold"
                >
                    Nombre mascota
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400
                    rounded-md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="owner" 
                    className="text-gray-700 uppercase font-bold"
                >
                    Nombre propietario
                </label>
                <input
                    id="owner"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400
                    rounded-md"
                    value={owner}
                    onChange={e => setOwner(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email" 
                    className="text-gray-700 uppercase font-bold"
                >
                    Email propietario
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400
                    rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="date" 
                    className="text-gray-700 uppercase font-bold"
                >
                    Fecha alta
                </label>
                <input
                    id="date"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400
                    rounded-md"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="symptoms" 
                    className="text-gray-700 uppercase font-bold"
                >
                    Síntomas
                </label>
                <textarea
                    id="symptoms"
                    placeholder="Describe los síntomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400
                    rounded-md"
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                />
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white 
                    uppercase font-bold hover:bg-indigo-700
                    cursor-pointer transition-colors rounded-lg"
                    value={id ? "Guardar cambios" : "Agregar paciente"}
                />
            </div>

            {msg && <Alert alert={alert}/>}

        </form>

    </>
    
  )
}

export default Form;