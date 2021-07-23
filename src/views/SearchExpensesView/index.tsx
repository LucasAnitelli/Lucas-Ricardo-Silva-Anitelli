import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ToastAndroid,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import {
  ButtonHeader,
  Container,
  ContainerHeader,
  Content,
  IconClick,
  Title,
} from './styles';
import palette from '../../theme/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListExpensesDTO} from '../../dto/listExpenses';
import {
  deleteExpensesController,
  getSearchExpensesController,
} from '../../controller/expensesController';
import ListExpenses from '../../components/ListExpenses';
const SearchExpensesView: React.FC = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ListExpensesDTO>(null);

  useEffect(() => {
    if (!searchText) {
      setShowFlatList(false);
    }
  }, [searchText]);

  const searchList = async (_id: string) => {
    setLoading(true);
    try {
      if (_id === '') {
        ToastAndroid.show('Por favor, preencher o campo!', ToastAndroid.LONG);
        setLoading(false);
        return;
      }
      const result = await getSearchExpensesController(_id);
      if (result) {
        setList(result);
      } else {
        ToastAndroid.show('Despesa não encontrada', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Despesa não encontrada', ToastAndroid.LONG);
    }
    setLoading(false);
    Keyboard.dismiss();
  };

  const newStateName = () => {
    searchList(searchText);
    setShowFlatList(true);
  };

  const removeExpenses = async (_id: string) => {
    Alert.alert('Remover', `Deseja remover?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const response = await deleteExpensesController(_id);
            if (response) {
              setSearchText('');
              setShowFlatList(true);
              setList(null);
              ToastAndroid.show('Excluido com sucesso!!', ToastAndroid.LONG);
            } else {
              ToastAndroid.show('Não foi possível excluir', ToastAndroid.LONG);
            }
          } catch {
            ToastAndroid.show('Erro ao excluir', ToastAndroid.LONG);
          }
        },
      },
    ]);
  };

  const editInfo = (data: ListExpensesDTO) => {
    navigation.navigate('EditExpensesView', {data});
  };

  const renderCard = () => {
    return (
      <>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={palette.blue} />
          </View>
        ) : (
          <ListExpenses
            postExpenses={list}
            handleRemove={() => {
              removeExpenses(list._id);
            }}
            handleEdit={() => {
              editInfo(list);
            }}
          />
        )}
      </>
    );
  };

  return (
    <Container>
      <Content>
        <ContainerHeader>
          <ButtonHeader
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={20} color={palette.dark} />
          </ButtonHeader>
        </ContainerHeader>
        <View style={{flex: 1}}>
          <Input
            placeholder="Id"
            handleChange={e => {
              setSearchText(e);
            }}
            value={searchText}
            returnKeyType="search"
          />
        </View>
        <IconClick
          onPress={() => {
            newStateName();
          }}>
          <Icon name="search" size={25} color={palette.dark} />
        </IconClick>
      </Content>
      <View style={{padding: 16}}>
        <Title>Resultados</Title>
      </View>
      {showFlatList && !!searchText && !!list ? renderCard() : <></>}
    </Container>
  );
};

export default SearchExpensesView;
