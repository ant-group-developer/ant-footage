import { showNotification } from '@/helpers/messagesHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../apis';
import { userQuerykeys } from '../constants';
import { UpdateUser } from '../types';

export default function useUpdateUser(onErrorCb: (errors: any) => void) {
    const queryClient = useQueryClient();
    const handleSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: userQuerykeys.getList,
        });
        showNotification('success', 'Update user successfully');
    };

    const handleOnError = (error: any) => {
        const apiErrors = error.response.data.errors;
        const formattedErrors = apiErrors.map((error: any) => ({
            name: error.key,
            errors: [error.message],
        }));

        if (onErrorCb) {
            onErrorCb(formattedErrors);
        }
    };

    const mutation = useMutation({
        mutationFn: ({ id, data }: UpdateUser) => userApi.updateUser(id, data),
        onSuccess: handleSuccess,
        onError: handleOnError,
    });

    const updateUser = ({ id, data }: UpdateUser) => {
        mutation.mutate({ id, data });
    };
    return {
        ...mutation,
        updateUser,
    };
}
