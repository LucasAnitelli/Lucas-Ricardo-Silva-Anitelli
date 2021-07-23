import React from 'react';
import {View} from 'react-native';
import {ListProps} from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';
import {useMask} from '../../utils/Mask';
import {
  ButtonRemove,
  Container,
  Price,
  Product,
  DateClient,
  InputDescription,
} from './styles';

const ListExpenses: React.FC<ListProps> = props => {
  const {handleRemove, postExpenses, handleEdit} = props;

  return (
    <Container>
      <View style={{flex: 1, marginLeft: 16, width: 75, height: 75}}>
        <Product>{postExpenses?.item}</Product>
        <Price>{useMask('moneymask', String(postExpenses?.value))}</Price>
        <DateClient>{useMask('date', postExpenses?.date)}</DateClient>
        {/*  <InputDescription>{postExpenses.additionalInfo}</InputDescription> */}
      </View>
      <ButtonRemove onPress={handleEdit}>
        <Icon name="pencil" size={30} color={palette.dark} />
      </ButtonRemove>
      <ButtonRemove onPress={handleRemove}>
        <Icon name="trash" size={30} color={palette.dark} />
      </ButtonRemove>
    </Container>
  );
};

export default ListExpenses;
