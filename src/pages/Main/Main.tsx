import { login, logout, register } from '@/api/User';
import './main.scss';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { unknown } from 'zod';

export const Main = ({ data }) => {
    const queryClient = useQueryClient()

    console.log(data.data)

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            console.log('success login')
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        loginMutation.mutate({ email: form.email.value, password: form.password.value })
        form.reset()
    }

    const exit = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            console.log('exit')
            queryClient.resetQueries({ queryKey: ['profile'] })
        }
    })

    const handleExit = () => {
        exit.mutate()
    }

    const regMutation = useMutation({
        mutationFn: register,
        onSuccess: (data, variables) => {
            loginMutation.mutate(variables)
        }
    })

    const handleRegSubmit = (e: FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        regMutation.mutate({ email: form.email.value, password: form.password.value, name: form.uName.value, surname: form.surname.value })
        form.reset()
    }

    switch (data.status) {
        case 'error':
            return (
                <>
                    <button onClick={handleExit}>exit</button>
                    <button onClick={() => queryClient.refetchQueries({ queryKey: ['profile'] })}>getProfile</button>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name='email' />
                        <input type="text" name='password' />
                        <button>submit</button>
                    </form>
                    <form onSubmit={handleRegSubmit}>
                        <input type="email" name='email' />
                        <input type="text" name='password' />
                        <input type="text" name='uName' />
                        <input type="text" name='surname' />
                        <button>add new user</button>
                    </form>
                </>
            )
        case 'pending':
            return <div>Loading...</div>
        case 'success':
            return (
                <>
                    <div>Profile</div>
                    <button onClick={handleExit}>exit</button>
                </>
            )
    }

}