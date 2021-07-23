import React, {useState} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  ButtonHeader,
  Container,
  ContainerHeader,
  ContainerInput,
  ContainerTitle,
  Title,
} from './styles';
import palette from '../../theme/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Keyboard, ToastAndroid} from 'react-native';
import {addExpensesController} from '../../controller/expensesController';
import {ListExpensesDTO} from '../../dto/listExpenses';
import {useMask} from '../../utils/Mask';

const AddExpensesView: React.FC = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddExpenses = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      if (date === '' || value === '' || expenses === '') {
        ToastAndroid.show(
          'Por favor, preencher todos os campos!',
          ToastAndroid.LONG,
        );
        setLoading(false);
        return;
      }
      let value2 = value.replace('R$', '').replace(',', '').replace('.', '');
      const bodyData: ListExpensesDTO = {
        date: useMask('datesendback', date),
        item: expenses,
        value: Number(value2),
        additionalInfo: {},
      };
      const response = await addExpensesController(bodyData);
      if (response) {
        ToastAndroid.show(
          'Despesa adicionada com sucesso!!',
          ToastAndroid.LONG,
        );
        setLoading(false);
        navigation.goBack();
      } else {
        ToastAndroid.show('Não foi possível adicionar', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao adicionar', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContainerHeader>
        <ButtonHeader
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-left" size={20} color={palette.dark} />
        </ButtonHeader>
      </ContainerHeader>
      <ContainerTitle>
        <Title>Adicionar Novas Despesas</Title>
      </ContainerTitle>
      <ContainerInput>
        <Input
          handleChange={e => {
            setDate(useMask('dateFor', e));
          }}
          value={date}
          placeholder="data"
        />
        <Input
          handleChange={e => {
            setExpenses(e);
          }}
          value={expenses}
          placeholder="insira uma despesa"
        />
        <Input
          handleChange={e => {
            setValue(useMask('moneymask', e));
          }}
          value={value}
          placeholder="valor"
        />
      </ContainerInput>
      <Button
        title="Adicionar"
        handleClick={handleAddExpenses}
        backgroundColor={palette.blue}
        textColor={palette.white}
        loading={loading}
      />
    </Container>
  );
};

export default AddExpensesView;
