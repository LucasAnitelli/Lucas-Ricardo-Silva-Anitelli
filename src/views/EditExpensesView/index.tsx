import React, {useState, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Keyboard, ToastAndroid} from 'react-native';
import {useMask} from '../../utils/Mask';
import {ParamList} from './types';
import {ListExpensesDTO} from '../../dto/listExpenses';
import {editExpensesController} from '../../controller/expensesController';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';

const EditExpensesView: React.FC = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const {data} = routes.params as ParamList;
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [_id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInfo();
  }, [data]);

  const loadInfo = async () => {
    try {
      setId(data._id);
      setDate(useMask('date', data.date));
      setValue(useMask('moneymask', String(data.value)));
      setExpenses(data.item);
    } catch (error) {
      ToastAndroid.show('Erro ao carregar informações', ToastAndroid.LONG);
    }
  };

  const handleEdit = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
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
      const response = await editExpensesController(_id, bodyData);
      if (response) {
        ToastAndroid.show('Despesa alterada com sucesso!!', ToastAndroid.SHORT);
        setLoading(false);
        navigation.navigate('HomeListView');
      } else {
        ToastAndroid.show('Não foi possível alterar', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao alterar', ToastAndroid.LONG);
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
        <Title>Alterar Despesa</Title>
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
        title="Alterar"
        handleClick={handleEdit}
        backgroundColor={palette.blue}
        textColor={palette.white}
        loading={loading}
      />
    </Container>
  );
};

export default EditExpensesView;
