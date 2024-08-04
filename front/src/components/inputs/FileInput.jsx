import { useSelector } from 'react-redux';
import Uploady, { withRequestPreSendUpdate } from '@rpldy/uploady';
import FileInputHelper from './FileInputHelper';
import { BACKEND_API } from '../../config';

const FileInput = ({ label, className, types, multiple = false, setValue, api }) => {
    const token = useSelector(state => state.auth.user?.token);

    return (
        <Uploady
            destination={{ 
                url: BACKEND_API + api,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }}
            multiple={multiple}
            accept={types}
        >
            <FileInputHelper label={label} className={className} setValue={setValue} />
        </Uploady>
    );
}

export default FileInput;

