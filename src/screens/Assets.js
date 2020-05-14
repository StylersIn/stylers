import React from 'react';
import Svg, {
    Path, Circle, Defs, ClipPath, Rect, G, Line,
} from "react-native-svg";
import { Text } from 'react-native';

export const SplashLogo = () => {
    return <Svg width="187" height="59" viewBox="0 0 187 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19.6289 40.2861C19.6289 38.8376 19.043 37.6738 17.8711 36.7949C16.7155 35.916 14.9658 35.2324 12.6221 34.7441C10.2783 34.2396 8.4554 33.6699 7.15332 33.0352C5.86751 32.3841 4.90723 31.5947 4.27246 30.667C3.65397 29.7393 3.34473 28.6162 3.34473 27.2979C3.34473 25.2145 4.21549 23.4974 5.95703 22.1465C7.69857 20.7793 9.92839 20.0957 12.6465 20.0957C15.5924 20.0957 17.9525 20.8281 19.7266 22.293C21.5169 23.7415 22.4121 25.6377 22.4121 27.9814H19.4824C19.4824 26.4352 18.8314 25.1494 17.5293 24.124C16.2435 23.0986 14.6159 22.5859 12.6465 22.5859C10.7259 22.5859 9.17969 23.0173 8.00781 23.8799C6.85221 24.7262 6.27441 25.833 6.27441 27.2002C6.27441 28.5186 6.75456 29.5439 7.71484 30.2764C8.69141 30.9925 10.4574 31.6517 13.0127 32.2539C15.5843 32.8561 17.5049 33.499 18.7744 34.1826C20.0602 34.8662 21.0124 35.6882 21.6309 36.6484C22.2493 37.6087 22.5586 38.7725 22.5586 40.1396C22.5586 42.3695 21.6553 44.1517 19.8486 45.4863C18.0583 46.821 15.7145 47.4883 12.8174 47.4883C9.74121 47.4883 7.24284 46.7477 5.32227 45.2666C3.41797 43.7692 2.46582 41.8812 2.46582 39.6025H5.39551C5.50944 41.3115 6.22559 42.6462 7.54395 43.6064C8.87858 44.5505 10.6364 45.0225 12.8174 45.0225C14.8519 45.0225 16.4958 44.5749 17.749 43.6797C19.0023 42.7845 19.6289 41.6533 19.6289 40.2861ZM33.6914 13.8213V20.584H39.1602V22.9766H33.6914V40.5791C33.6914 42.0439 33.9518 43.1344 34.4727 43.8506C35.0098 44.5667 35.8968 44.9248 37.1338 44.9248C37.6221 44.9248 38.4115 44.8434 39.502 44.6807L39.624 47.0732C38.859 47.3499 37.8174 47.4883 36.499 47.4883C34.4971 47.4883 33.0404 46.9105 32.1289 45.7549C31.2174 44.583 30.7617 42.8659 30.7617 40.6035V22.9766H25.9033V20.584H30.7617V13.8213H33.6914ZM53.5889 42.8008L61.3037 20.584H64.4531L53.1738 51.4922L52.5879 52.8594C51.1393 56.0658 48.9014 57.6689 45.874 57.6689C45.1742 57.6689 44.4255 57.555 43.6279 57.3271L43.6035 54.9102L45.1172 55.0566C46.5495 55.0566 47.7051 54.6986 48.584 53.9824C49.4792 53.2826 50.236 52.07 50.8545 50.3447L52.1484 46.7803L42.1875 20.584H45.3857L53.5889 42.8008ZM72.2656 47H69.3359V9.5H72.2656V47ZM90.4541 47.4883C88.208 47.4883 86.1735 46.9349 84.3506 45.8281C82.5439 44.7214 81.1361 43.1833 80.127 41.2139C79.1178 39.2282 78.6133 37.0065 78.6133 34.5488V33.499C78.6133 30.96 79.1016 28.6732 80.0781 26.6387C81.071 24.6042 82.4463 23.0091 84.2041 21.8535C85.9619 20.6816 87.8662 20.0957 89.917 20.0957C93.1234 20.0957 95.6624 21.1943 97.5342 23.3916C99.4222 25.5726 100.366 28.5592 100.366 32.3516V33.9873H81.5186V34.5488C81.5186 37.5436 82.373 40.042 84.082 42.0439C85.8073 44.0296 87.972 45.0225 90.5762 45.0225C92.1387 45.0225 93.514 44.7376 94.7021 44.168C95.9066 43.5983 96.9971 42.6868 97.9736 41.4336L99.8047 42.8252C97.6562 45.9339 94.5394 47.4883 90.4541 47.4883ZM89.917 22.5859C87.7197 22.5859 85.8643 23.3916 84.3506 25.0029C82.8532 26.6143 81.9417 28.779 81.6162 31.4971H97.4609V31.1797C97.3796 28.6406 96.6553 26.5736 95.2881 24.9785C93.9209 23.3835 92.1305 22.5859 89.917 22.5859ZM118.262 23.0742C117.643 22.9603 116.984 22.9033 116.284 22.9033C114.461 22.9033 112.915 23.416 111.646 24.4414C110.392 25.4505 109.497 26.9235 108.96 28.8604V47H106.055V20.584H108.911L108.96 24.7832C110.506 21.6582 112.988 20.0957 116.406 20.0957C117.22 20.0957 117.863 20.2015 118.335 20.4131L118.262 23.0742ZM138.721 40.2861C138.721 38.8376 138.135 37.6738 136.963 36.7949C135.807 35.916 134.058 35.2324 131.714 34.7441C129.37 34.2396 127.547 33.6699 126.245 33.0352C124.959 32.3841 123.999 31.5947 123.364 30.667C122.746 29.7393 122.437 28.6162 122.437 27.2979C122.437 25.2145 123.307 23.4974 125.049 22.1465C126.79 20.7793 129.02 20.0957 131.738 20.0957C134.684 20.0957 137.044 20.8281 138.818 22.293C140.609 23.7415 141.504 25.6377 141.504 27.9814H138.574C138.574 26.4352 137.923 25.1494 136.621 24.124C135.335 23.0986 133.708 22.5859 131.738 22.5859C129.818 22.5859 128.271 23.0173 127.1 23.8799C125.944 24.7262 125.366 25.833 125.366 27.2002C125.366 28.5186 125.846 29.5439 126.807 30.2764C127.783 30.9925 129.549 31.6517 132.104 32.2539C134.676 32.8561 136.597 33.499 137.866 34.1826C139.152 34.8662 140.104 35.6882 140.723 36.6484C141.341 37.6087 141.65 38.7725 141.65 40.1396C141.65 42.3695 140.747 44.1517 138.94 45.4863C137.15 46.821 134.806 47.4883 131.909 47.4883C128.833 47.4883 126.335 46.7477 124.414 45.2666C122.51 43.7692 121.558 41.8812 121.558 39.6025H124.487C124.601 41.3115 125.317 42.6462 126.636 43.6064C127.97 44.5505 129.728 45.0225 131.909 45.0225C133.944 45.0225 135.588 44.5749 136.841 43.6797C138.094 42.7845 138.721 41.6533 138.721 40.2861Z" fill="black" />
        <Path d="M155.156 47H148.076V20.584H155.156V47ZM147.661 13.748C147.661 12.6901 148.011 11.8193 148.711 11.1357C149.427 10.4521 150.396 10.1104 151.616 10.1104C152.821 10.1104 153.781 10.4521 154.497 11.1357C155.213 11.8193 155.571 12.6901 155.571 13.748C155.571 14.8223 155.205 15.7012 154.473 16.3848C153.757 17.0684 152.804 17.4102 151.616 17.4102C150.428 17.4102 149.468 17.0684 148.735 16.3848C148.019 15.7012 147.661 14.8223 147.661 13.748ZM167.485 20.584L167.705 23.6357C169.593 21.2757 172.124 20.0957 175.298 20.0957C178.097 20.0957 180.181 20.9176 181.548 22.5615C182.915 24.2054 183.615 26.6631 183.647 29.9346V47H176.592V30.1055C176.592 28.6081 176.266 27.5257 175.615 26.8584C174.964 26.1748 173.882 25.833 172.368 25.833C170.382 25.833 168.893 26.6794 167.9 28.3721V47H160.845V20.584H167.485Z" fill="white" />
    </Svg>
}

export const PickUp = () => {
    return <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="40" height="40" fill="white" />
        <Path d="M20.0217 38.7281C22.3249 38.7281 24.192 36.861 24.192 34.5578C24.192 32.2548 22.3249 30.3877 20.0217 30.3877C17.7186 30.3877 15.8516 32.2548 15.8516 34.5578C15.8516 36.861 17.7186 38.7281 20.0217 38.7281Z" fill="#3E4958" />
        <Path fillRule="evenodd" clipRule="evenodd" d="M20.0213 31.4137C18.2846 31.4137 16.8767 32.8215 16.8767 34.5582C16.8767 36.2949 18.2846 37.7027 20.0213 37.7027C21.7579 37.7027 23.1658 36.2949 23.1658 34.5582C23.1658 32.8215 21.7579 31.4137 20.0213 31.4137ZM14.8254 34.5582C14.8254 31.6886 17.1517 29.3623 20.0213 29.3623C22.8909 29.3623 25.2171 31.6886 25.2171 34.5582C25.2171 37.4278 22.8909 39.754 20.0213 39.754C17.1517 39.754 14.8254 37.4278 14.8254 34.5582Z" fill="#FDFDFD" />
        <Path fillRule="evenodd" clipRule="evenodd" d="M19.0104 21.9512H20.8703V33.8213H19.0104V21.9512Z" fill="#3E4958" />
        <Path d="M20.0222 22.4642C26.0103 22.4642 30.8647 17.61 30.8647 11.6218C30.8647 5.63365 26.0103 0.779297 20.0222 0.779297C14.034 0.779297 9.17969 5.63365 9.17969 11.6218C9.17969 17.61 14.034 22.4642 20.0222 22.4642Z" fill="#DE408B" />
        <Path fillRule="evenodd" clipRule="evenodd" d="M20.0219 1.29218C14.317 1.29218 9.69226 5.91694 9.69226 11.6219C9.69226 17.3267 14.317 21.9515 20.0219 21.9515C25.7269 21.9515 30.3516 17.3267 30.3516 11.6219C30.3516 5.91694 25.7269 1.29218 20.0219 1.29218ZM8.66663 11.6219C8.66663 5.35055 13.7506 0.266602 20.0219 0.266602C26.2933 0.266602 31.3773 5.35055 31.3773 11.6219C31.3773 17.8933 26.2933 22.9772 20.0219 22.9772C13.7506 22.9772 8.66663 17.8933 8.66663 11.6219Z" fill="#DE408B" />
        <Path d="M20.0223 14.9585C21.8648 14.9585 23.3585 13.4647 23.3585 11.6223C23.3585 9.77977 21.8648 8.28613 20.0223 8.28613C18.1798 8.28613 16.6862 9.77977 16.6862 11.6223C16.6862 13.4647 18.1798 14.9585 20.0223 14.9585Z" fill="#F9FFFF" />
    </Svg>
}

export const Naira = () => {
    return <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path opacity="0.5" d="M19.2572 10.0537H16.5271V7.42986H19.2572C19.6675 7.42986 20 7.09766 20 6.68735C20 6.277 19.6675 5.9446 19.2572 5.9446H16.5271V2.30386C16.5271 1.77241 16.4221 1.38233 16.2151 1.14471C16.0183 0.918663 15.7596 0.813477 15.4014 0.813477C15.0595 0.813477 14.8106 0.917938 14.6176 1.14258C14.413 1.38044 14.3092 1.77124 14.3092 2.3041V5.94504H9.17366L6.9901 2.64082C6.80322 2.34593 6.62751 2.06971 6.45687 1.80457C6.30324 1.56578 6.1534 1.37137 6.01187 1.2262C5.88657 1.09768 5.74378 0.998218 5.57677 0.921766C5.41919 0.849828 5.21886 0.813718 4.98184 0.813718C4.67954 0.813718 4.40513 0.896538 4.14237 1.06669C3.88234 1.23499 3.7026 1.44306 3.59282 1.70285C3.49646 1.94973 3.44548 2.32804 3.44548 2.81637V5.9448H0.742471C0.332324 5.94484 0 6.27724 0 6.68755C0 7.09786 0.332324 7.43006 0.742511 7.43006H3.44552V10.0542H0.742511C0.332324 10.0542 0 10.3865 0 10.797C0 11.2071 0.332324 11.5392 0.742511 11.5392H3.44552V15.696C3.44552 16.2118 3.55389 16.5979 3.76853 16.8432C3.97266 17.0772 4.23147 17.1858 4.58294 17.1858C4.92204 17.1858 5.17884 17.0767 5.39179 16.8423C5.60986 16.6022 5.72016 16.2163 5.72016 15.6961V11.5392H10.3672L12.882 15.3954C13.0569 15.6503 13.2374 15.9076 13.4175 16.1598C13.5799 16.3864 13.7572 16.586 13.9442 16.7527C14.1126 16.9035 14.2931 17.014 14.4808 17.0815C14.674 17.151 14.8998 17.1863 15.1504 17.1863C15.8305 17.1863 16.527 16.9781 16.527 15.434V11.5392H19.2572C19.6674 11.5392 19.9999 11.2067 19.9999 10.7965C20 10.3863 19.6675 10.0537 19.2572 10.0537ZM14.3091 7.42982V10.0537H11.8894L10.1556 7.42982H14.3091ZM5.7202 4.41492L6.71806 5.9446H5.7202V4.41492ZM5.7202 10.0537V7.42986H7.68699L9.39842 10.0537H5.7202ZM14.3091 13.716L12.8711 11.5392H14.3091V13.716Z" fill="black" />
    </Svg>
}

export const UserIcon = () => {
    return <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M29.0099 15C29.0099 23.2843 22.5158 30 14.505 30C6.49409 30 0 23.2843 0 15C0 6.71573 6.49409 0 14.505 0C22.5158 0 29.0099 6.71573 29.0099 15Z" fill="#D5DDE0" />
        <Path d="M15.5 15.4375C13.4375 15.4375 11.75 13.75 11.75 11.6875V10.75C11.75 8.6875 13.4375 7 15.5 7C17.5625 7 19.25 8.6875 19.25 10.75V11.6875C19.25 13.75 17.5625 15.4375 15.5 15.4375Z" fill="white" />
        <Path d="M17.375 17.3125H13.625C11 17.3125 8.9375 19.375 8.9375 22H22.0625C22.0625 19.375 20 17.3125 17.375 17.3125Z" fill="white" />
    </Svg>
}

export const EmailIcon = () => {
    return <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M29.0099 15C29.0099 23.2843 22.5158 30 14.505 30C6.49409 30 0 23.2843 0 15C0 6.71573 6.49409 0 14.505 0C22.5158 0 29.0099 6.71573 29.0099 15ZM8.53829 12.6989C8.72511 12.8352 9.28827 13.2401 10.2278 13.9134C11.1673 14.5867 11.8871 15.1051 12.3871 15.4686C12.442 15.5085 12.5587 15.5951 12.7372 15.7286C12.9158 15.8622 13.0642 15.9702 13.1822 16.0526C13.3004 16.1349 13.4432 16.2273 13.6109 16.3295C13.7785 16.4317 13.9365 16.5085 14.0848 16.5594C14.2332 16.6106 14.3705 16.6361 14.4969 16.6361H14.5052H14.5135C14.6398 16.6361 14.7772 16.6106 14.9256 16.5594C15.0739 16.5085 15.232 16.4316 15.3995 16.3295C15.567 16.2271 15.7098 16.1349 15.828 16.0526C15.9461 15.9702 16.0944 15.8622 16.273 15.7286C16.4515 15.595 16.5684 15.5085 16.6233 15.4686C17.1287 15.1051 18.4145 14.1817 20.4803 12.6987C20.8814 12.409 21.2164 12.0595 21.4856 11.6504C21.755 11.2415 21.8895 10.8125 21.8895 10.3637C21.8895 9.98862 21.759 9.66757 21.498 9.40055C21.237 9.13347 20.9279 9 20.5709 9H8.43937C8.01633 9 7.69078 9.14771 7.46276 9.44312C7.23477 9.73859 7.12078 10.1079 7.12078 10.5511C7.12078 10.909 7.27192 11.2969 7.57407 11.7145C7.87618 12.1321 8.1977 12.4603 8.53829 12.6989ZM16.9612 16.9819C17.8951 16.2829 19.2633 15.3027 21.0653 14.0415C21.3786 13.8199 21.6533 13.5726 21.8896 13.3V20.0669C21.8896 20.4422 21.7606 20.7629 21.5022 21.0301C21.244 21.2972 20.9336 21.4307 20.571 21.4307H8.43945C8.07681 21.4307 7.76632 21.2972 7.50811 21.0301C7.24984 20.763 7.12078 20.4421 7.12078 20.0669V13.3C7.36254 13.5784 7.64 13.8257 7.95326 14.0415C9.94218 15.4391 11.3075 16.4194 12.0493 16.9819C12.3624 17.2204 12.6166 17.4066 12.8115 17.5401C13.0066 17.6736 13.2662 17.8099 13.5904 17.9491C13.9145 18.0884 14.2167 18.1579 14.4969 18.1579H14.5052H14.5136C14.7939 18.1579 15.0959 18.0884 15.42 17.9491C15.7443 17.8099 16.0037 17.6736 16.1988 17.5401C16.3939 17.4066 16.648 17.2204 16.9612 16.9819Z" fill="#D5DDE0" />
    </Svg>
}

export const PhoneIcon = () => {
    return <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M14.505 30C22.5158 30 29.0099 23.2843 29.0099 15C29.0099 6.71573 22.5158 0 14.505 0C6.49409 0 0 6.71573 0 15C0 23.2843 6.49409 30 14.505 30ZM19.1922 17.0423L21.4322 19.3643C21.8772 19.8269 21.8639 20.5928 21.4024 21.0722L20.7628 21.7213L20.749 21.7086C20.4791 21.9275 20.1678 22.1106 19.8347 22.2455C19.5247 22.3702 19.2197 22.4491 18.9014 22.4885C18.7553 22.5046 15.3677 22.8337 11.164 18.477C8.12301 15.325 7.00246 13.0022 7.29825 10.4607C7.33279 10.1437 7.40834 9.82744 7.52969 9.49599C7.66133 9.14778 7.83823 8.82488 8.04992 8.54491L8.03267 8.52716L8.66399 7.86905C9.12642 7.38962 9.86564 7.37563 10.3108 7.83691L12.5508 10.1592C12.996 10.6211 12.9832 11.3867 12.5208 11.8662L12.1484 12.2526L11.391 13.0365C11.4249 13.098 11.4592 13.1623 11.4947 13.2288C11.5005 13.2398 11.5064 13.2509 11.5124 13.262L11.5146 13.2662C11.9105 14.005 12.4521 15.0157 13.4797 16.0805C14.5061 17.1452 15.4815 17.7062 16.1942 18.1154C16.2717 18.1606 16.3456 18.2031 16.4169 18.2438L17.5454 17.0744C18.0071 16.5957 18.746 16.5817 19.1922 17.0423Z" fill="#D5DDE0" />
    </Svg>
}

export const ErrorIcon = ({ color = "#000000", height = 30, width = 30, }) => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 40 40">
        <G id="ic_error_outline_48px" transform="translate(-4 -4)">
            <Path id="Path_96" data-name="Path 96" d="M22,30h4v4H22Zm0-16h4V26H22ZM23.99,4A20,20,0,1,0,44,24,19.986,19.986,0,0,0,23.99,4ZM24,40A16,16,0,1,1,40,24,16,16,0,0,1,24,40Z" fill={color} />
        </G>
    </Svg>
}