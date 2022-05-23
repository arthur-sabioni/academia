import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { makeStyles, Button, MenuItem, TextField, CircularProgress } from '@material-ui/core';
import { primary, gray100 } from '../../Utils/colors';
import { requestConfigRegister, requestConfigAddress } from '../../Utils/requestsConfigs';
import Header from '../../components/Header/Header';
import { bairros } from '../../Utils/bairros';

const districts = bairros;

const Register = () => {
  const { container, containerRegister, progress, title, fieldset, legend, form, personal, address, fieldName, fieldPhone, fieldCpf, fieldEmail, fieldPassword, fieldCep, fieldDistrict, fieldStreet, fieldNumber, fieldComplement, submit, button } = useStyles();
  const navigate = useNavigate();

  const { loading, error, data, sendRequest } = useHttp('');

  const [district, setDistrict] = useState(districts[0].value);
  const [personalData, setPersonalData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
  });
  const [addressData, setAddressData] = useState({
    cep: '',
    district: '',
    street: '',
    number: '',
    complement: '',
  });

  useEffect(() => {
    if (data && data.token) {
      sendRequest(requestConfigAddress(data.token, addressData));
      navigate(`/${data.token}`);
    }
  }, [data]);

  const register = () => sendRequest(requestConfigRegister(personalData));

  const handleChange = (event, field, type = 'personal') => type === 'address' ?
    setAddressData(currentAddressData => ({
      ...currentAddressData,
      [field]: event.target.value,
    }))
    :
    setPersonalData(currentPersonalData => ({
      ...currentPersonalData,
      [field]: event.target.value,
    }));

  return (
    <div className={container}>
      <Header registerDisabled={true} cartDisabled={true} />
      <div className={containerRegister}>
        {loading ? <CircularProgress className={progress} /> : <>
          <div className={title}>Cadastro</div>
          <fieldset className={fieldset}>
            <legend className={legend}>Dados pessoais</legend>
            <div className={`${form} ${personal}`}>
              <TextField className={fieldName} id="text-field-name" variant="outlined" label="Nome" onChange={event => handleChange(event, 'name')} />
              <TextField className={fieldCpf} id="text-field-cpf" variant="outlined" label="CPF" onChange={event => handleChange(event, 'cpf')} />
              <TextField className={fieldPhone} id="text-field-phone" variant="outlined" label="Celular" onChange={event => handleChange(event, 'phone')} />
              <TextField className={fieldEmail} id="text-field-email" variant="outlined" label="E-mail" onChange={event => handleChange(event, 'email')} />
              <TextField type="password" className={fieldPassword} id="text-field-password" variant="outlined" label="Senha" onChange={event => handleChange(event, 'password')} />
            </div>
          </fieldset>
          <fieldset className={fieldset}>
            <legend className={legend}>Endereço</legend>
            <div className={`${form} ${address}`}>
              <TextField className={fieldCep} id="text-field-cep" variant="outlined" label="CEP" helperText="Somente são permitidos endereços na cidade de Belo Horizonte" onChange={event => handleChange(event, 'cep', 'address')} />
              <TextField
                select
                className={fieldDistrict}
                id="select-district"
                variant="outlined"
                label="Bairro"
                value={district}
                onChange={event => {
                  setDistrict(event.target.value);
                  handleChange(event, 'district', 'address')
                }}
              >
                {districts.map(d => (
                  <MenuItem key={d.key} value={d.value}>
                    {d.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField className={fieldStreet} id="text-field-street" variant="outlined" label="Rua" onChange={event => handleChange(event, 'street', 'address')} />
              <TextField className={fieldNumber} id="text-field-number" variant="outlined" label="Número" onChange={event => handleChange(event, 'number', 'address')} />
              <TextField className={fieldComplement} id="text-field-complement" variant="outlined" label="Complemento" onChange={event => handleChange(event, 'complement', 'address')} />
            </div>
          </fieldset>
          <div className={submit}>
            <Button className={button} variant="contained" onClick={() => register()}>Cadastrar</Button>
          </div>
        </>}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  containerRegister: {
    padding: '40px 64px',
    flexGrow: 1,
    flexBasis: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: `${gray100}`,
  },
  progress: {
    margin: 'auto',
    color: primary,
  },
  title: {
    fontSize: 32,
    textAlign: 'left',
    marginBottom: 24,
  },
  fieldset: {
    color: primary,
    border: `solid 1px ${primary}`,
    borderRadius: 8,
    marginBottom: 32,
  },
  legend: {
    padding: '0 10px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 32,
    gridRowGap: 24,
    padding: 40,
  },
  personal: {
    gridTemplateAreas: `
      "field-name ."
      "field-cpf field-phone"
      "field-email field-password"
    `,
  },
  address: {
    gridTemplateAreas: `
      "field-cep field-district"
      "field-street field-number"
      "field-complement ."
    `,
  },
  fieldName: {
    gridArea: "field-name",
  },
  fieldCpf: {
    gridArea: "field-cpf",
  },
  fieldPhone: {
    gridArea: "field-phone",
  },
  fieldEmail: {
    gridArea: "field-email",
  },
  fieldPassword: {
    gridArea: "field-password",
  },
  fieldCep: {
    gridArea: "field-cep",
  },
  fieldDistrict: {
    gridArea: "field-district",
  },
  fieldStreet: {
    gridArea: "field-street",
  },
  fieldNumber: {
    gridArea: "field-number",
  },
  fieldComplement: {
    gridArea: "field-complement",
  },
  submit: {
    display: 'flex',
    justifyContent: 'right',
  },
  button: {
    color: gray100,
    backgroundColor: primary,
    padding: '8px 16px',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: primary,
      boxShadow: '0 4px 1em gray',
    }
  },
})

export default Register;
