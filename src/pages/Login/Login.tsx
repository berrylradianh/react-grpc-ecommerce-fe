import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';


const loginSchema = yup.object().shape({
    email: yup.string().email('Email tidak valid').required('Alamat email wajib diisi'),
    password: yup.string().required('Kata sandi wajib diisi').min(6, 'Kata sandi minimal 6 karakter')
});

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const form  = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema)
    });

    const submitHandler = (values: LoginFormValues) => {
        console.log(values);
        Swal.fire({
            icon : 'success',
            title: 'Login Berhasil',
            confirmButtonText: 'Ok'
        });
    };
    return (
        <div className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4">
                            <h2 className="section-title text-center mb-5">Masuk</h2>
                            <form onSubmit={form.handleSubmit(submitHandler)} className="login-form">
                                <div className="form-group mb-4">
                                    <input type="text" className={`form-control ${form.formState.errors.email ? 'is-invalid' : ''}`} placeholder="Alamat email" {...form.register('email')} />
                                    <div className={`text-danger ${form.formState.errors.email ? '' : 'hidden'}`} style={{height: 8}}><small>{form.formState.errors.email?.message ?? ''}</small></div>
                                </div>
                                <div className="form-group mb-4">
                                    <input type="password" className={`form-control ${form.formState.errors.password ? 'is-invalid' : ''}`} placeholder="Kata sandi" {...form.register('password')} />
                                    <div className={`text-danger ${form.formState.errors.password ? '' : 'hidden'}`} style={{height: 10}}><small>{form.formState.errors.password?.message ?? ''}</small></div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Masuk</button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>Belum punya akun? <Link to="/register" className="text-primary">Daftar di sini</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;