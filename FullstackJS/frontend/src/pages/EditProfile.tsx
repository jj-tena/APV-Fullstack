import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from 'react';
import Alert from "../components/Alert";

export const EditProfile = () => {

    const {auth, updateProfile} = useAuth();
    const [profile, setProfile] = useState({})
    const [alert, setAlert] = useState({})

    useEffect(() => {
        setProfile(auth)
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email} = profile;
        if([name, email].includes('')){
            setAlert({
                msg: 'Email y nombre son obligatorios',
                error: true
            });
            return;
        }
        const result = await updateProfile(profile);
        setAlert(result);
    }

    const {msg} = alert

    return (
      <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Edita tu {' '}
            <span className="text-indigo-600 font-bold">
                Perfil
            </span>
        </p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alert alert={alert}/>}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="name"
                            value={profile.name || ''}
                            onChange={e => setProfile({
                                ...profile,
                                [e.target.name] : e.target.value
                            })}
                        >
                        </input>
                    </div>
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                        >
                            Sitio web
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            value={profile.web || ''}
                            onChange={e => setProfile({
                                ...profile,
                                [e.target.name] : e.target.value
                            })}
                        >
                        </input>
                    </div>
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                        >
                            Teléfono
                        </label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="phoneNumber"
                            value={profile.phoneNumber || ''}
                            onChange={e => setProfile({
                                ...profile,
                                [e.target.name] : e.target.value
                            })}
                        >
                        </input>
                    </div>
                    <div className="my-3">
                        <label 
                            className="uppercase font-bold text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={profile.email || ''}
                            onChange={e => setProfile({
                                ...profile,
                                [e.target.name] : e.target.value
                            })}
                        >
                        </input>
                    </div>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white
                        rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
      </>
    )
  }
  