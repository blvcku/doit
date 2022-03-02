import { useEffect } from 'react';
import { db } from '../../../firebase';
import PlusIcon from '../../../images/formsList/plus.svg';
import SearchIcon from '../../../images/formsList/search.svg';
import FormIcon from '../../../images/formsList/form.svg';

import useAuth from '../../../hooks/useAuth';
import useFilter from '../../../hooks/useFilter';

import { Link } from 'react-router-dom';
import { Container, Form, CreateForm, FormsContainer, SearchBar } from "./FormsList.styles";

const FormsList = () => {

    const { currentUser: {uid} } = useAuth();
    const { setData, filter, setFilter, filteredData } = useFilter();

    const handleFilterChange = e => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    useEffect(() => {
        const unsubscribe = db.collection('forms').where('authorID', '==', uid).orderBy('createdAt').onSnapshot(snapshot => {
            const forms = [];
            snapshot.forEach(form => forms.unshift({...form.data(), id: form.id}));
            setData(forms);
        })
        return unsubscribe;
    }, [uid, setData]);

    return(
        <Container>
            <nav>
                <SearchBar>
                    <input placeholder='Search' type='text' name='search' id='search' value={filter} onChange={handleFilterChange} />
                    <img src={SearchIcon} alt='Search' />
                </SearchBar>
            </nav>
            <FormsContainer>
                <CreateForm>
                    <Link to='/dashboard/forms/create'>
                        <img src={PlusIcon} alt='Create' />
                        <p>Create Form</p>
                    </Link>
                </CreateForm>
                {filteredData.map(({id, title, createdAt}) => (
                    <Form key={id}>
                        <Link to={`/dashboard/forms/${id}`}>
                            <img src={FormIcon} alt='form' />
                            <div>
                                <p>{title}</p>
                                <p>
                                    {new Date(createdAt.toDate())
                                        .toLocaleDateString('en-US', 
                                            {day: 'numeric', month: 'short', year: 'numeric'}
                                        )
                                    }
                                </p>
                            </div>
                        </Link>
                    </Form>
                ))}
            </FormsContainer>
        </Container>
    )
}

export default FormsList;