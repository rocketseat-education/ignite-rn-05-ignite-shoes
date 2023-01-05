import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  onClose: () => void;
}

export function Notification({ title, onClose }: Props) {

  const { navigate } = useNavigation();

  function handleOnPress() {
    navigate('details', { productId: '7' });
    onClose();
  }

  return (
    <Pressable w="full" p={4} pt={12} bgColor="gray.200" position="absolute" top={0} onPress={handleOnPress}>
      <HStack justifyContent="space-between" alignItems="center">
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
          />
      </HStack>
    </Pressable>
  );
}