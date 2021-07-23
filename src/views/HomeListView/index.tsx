import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  deleteExpensesController,
  getListExpensesController,
} from '../../controller/expensesController';
import {
  ButtonHeader,
  Container,
  ContainerAlert,
  ContainerContentHeader,
  ContainerHeader,
  TextAlert,
  WelcomeUser,
} from './styles';
import {useAuth} from '../../contexts/auth';
import palette from '../../theme/palette';
import {ListExpensesDTO} from '../../dto/listExpenses';
import ListExpenses from '../../components/ListExpenses';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ToastAndroid,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeListView: React.FC = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const [page, setPage] = useState(1);
  const [pageScroll, setPageScroll] = useState(1);
  const [expensesList, setExpensesList] = useState<ListExpensesDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadExpenses();
    });
    return unsubscribe;
  }, [navigation]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await getListExpensesController(page, 20);
      setPageScroll(1);
      if (response) {
        const list = response;
        if (response.length === 20) {
          const pages = 3;
          setTotalPages(pages);
        }
        setExpensesList(list);
        setLoading(false);
      } else {
        ToastAndroid.show(
          'Erro ao carregar lista de despesas',
          ToastAndroid.LONG,
        );
        setLoading(false);
      }
    } catch (error) {
      ToastAndroid.show(
        'Erro ao carregar lista de despesas',
        ToastAndroid.LONG,
      );
      setLoading(false);
    }
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
              loadExpenses();
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

  const paginationScroll = async () => {
    if (loadingPage) {
      return;
    }
    setLoadingPage(true);
    if (pageScroll < totalPages) {
      setPageScroll(pageScroll + 1);
      try {
        const response = await getListExpensesController(pageScroll + 1, 20);
        if (response) {
          const list = response;
          setExpensesList([...expensesList, ...list]);
        } else {
          console.log('paginationScroll');
        }
      } catch (error) {
        ToastAndroid.show(
          'Erro ao carregar lista de despesas',
          ToastAndroid.LONG,
        );
      }
    } else {
      ToastAndroid.show('Lista de despesas carregadas', ToastAndroid.LONG);
    }
    setLoadingPage(false);
  };

  const editInfo = (data: ListExpensesDTO) => {
    navigation.navigate('EditExpensesView', {data});
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={expensesList}
        style={{marginTop: 0}}
        keyExtractor={item => String(item._id)}
        renderItem={({item}) => (
          <ListExpenses
            postExpenses={item}
            handleRemove={() => {
              removeExpenses(item._id);
            }}
            handleEdit={() => {
              editInfo(item);
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={paginationScroll}
        onEndReachedThreshold={0.4}
        refreshing={false}
        onRefresh={() => {
          loadExpenses();
        }}
      />
    );
  };

  const addExpenses = () => {
    navigation.navigate('AddExpensesView');
  };

  const searchExpenses = () => {
    navigation.navigate('SearchExpensesView');
  };

  const logOut = () => {
    signOut();
  };

  const renderNotExpenses = () => {
    return (
      <ContainerAlert>
        <TextAlert>
          Você não tem nenhuma despesa, por favor adicionar!!
        </TextAlert>
      </ContainerAlert>
    );
  };

  return (
    <Container>
      <ContainerHeader>
        <WelcomeUser>Bem Vindo</WelcomeUser>
        <ContainerContentHeader>
          <ButtonHeader onPress={addExpenses}>
            <Icon name="plus" size={24} color={palette.white} />
          </ButtonHeader>
          <ButtonHeader onPress={searchExpenses}>
            <Icon name="search" size={24} color={palette.white} />
          </ButtonHeader>
          <ButtonHeader onPress={logOut}>
            <Icon name="sign-out" size={24} color={palette.white} />
          </ButtonHeader>
        </ContainerContentHeader>
      </ContainerHeader>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={palette.white} />
        </View>
      ) : expensesList.length > 0 ? (
        renderFlatList()
      ) : (
        renderNotExpenses()
      )}
    </Container>
  );
};

export default HomeListView;
