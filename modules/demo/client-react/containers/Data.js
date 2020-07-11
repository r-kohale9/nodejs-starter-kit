import Avatar from '../Icons/userimage.svg';
import Product from '../Icons/product1.svg';
import Discount from '../Icons/discount.png';

const USER = {
  id: 2,
  name: 'Riya Rodriguez',
  thumbnail: Avatar,
  // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  ratting: 4.6,
  distance: 3,
  menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
  mail: 'riya@homebakers.com',
  phone: '+91 88888 9999',
  watsapp: '+91 88888 99999',
  details:
    "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
};

const PERSONAL_INFO = {
  id: 1,
  fullName: 'Katrina',
  dateOfBirth: '12/12/1989'
};

const USERS = [
  {
    id: 1,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 2,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 3,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 4,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  },
  {
    id: 5,
    name: 'Riya Rodriguez',
    thumbnail: Avatar,
    // thumbnail: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    ratting: 4.6,
    distance: 3,
    menu: ['Indian Desserts', 'Pastries', 'Cakes', 'Breads'],
    details:
      "Riya creates beautiful fondant cakes according to any theme of your choice. Her quirky cakes are known to stifle a giggle at the very least. If that isn't all her cakes taste just as good as it looks, if not better"
  }
];

const PROFILELIST = [
  {
    id: 1,
    title: 'My orders',
    details: '12 orders'
  },
  {
    id: 2,
    title: 'Delivery addresses',
    details: '3 ddresses'
  },
  {
    id: 3,
    title: 'Payment methods',
    details: 'Visa **34'
  },
  {
    id: 4,
    title: 'Promocodes',
    details: 'You have special promocodes'
  },
  {
    id: 5,
    title: 'My reviews',
    details: 'Reviews for 4 items'
  },
  {
    id: 6,
    title: 'Settings',
    details: 'Notifications, password'
  }
];

const CART = {
  id: 1947034,
  // deliveryDate: '05-02-2020',
  trackingNumber: '',
  quantity: 3,
  totalAmount: 1400,
  status: 'STALE',
  paymentMethod: '',
  deliveryMethod: '',
  discount: '',
  delivery: 0,
  shippingAddress: {
    addressName: 'katrina',
    address: '22nd Cross Rd Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102'
  },
  payment: {
    id: 1,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe'
  },
  orderDetails: [
    {
      id: 1,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 1,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 3,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 6,
      price: 700
    }
  ]
};

const ORDER = {
  id: 1947034,
  date: '05-02-2020',
  trackingNumber: 'DZ089223878',
  quantity: 3,
  totalAmount: 1400,
  status: 'Delivered',
  paymentMethod: '',
  deliveryMethod: 'Self pickup',
  discount: '10% personal promo code',
  shippingAddresses: {
    streetAddress1: '22nd Cross Rd',
    streetAddress2: 'Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102'
  },
  orderDetails: [
    {
      id: 1,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 1,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 1,
      price: 700
    },
    {
      id: 3,
      title: 'Overloaded Choco',
      imageUrl: Product,
      category: 'Cakes',
      flavour: 'Chocolate',
      weight: 1,
      units: 1,
      price: 700
    }
  ]
};

const PROMOCODES = [
  {
    id: 1,
    thumbnail: Discount,
    title: 'Personal offer',
    promocode: 'mypromocode2020',
    validity: '6 days remaining'
  },
  {
    id: 2,
    thumbnail: Discount,
    title: 'Mealting summer',
    promocode: 'summer2020',
    validity: '23 days remaining'
  }
];

const ADDRESS = {
  id: 1,
  addressName: 'Katrina',
  address: '22nd Cross Rd, Sector 2 HSR Layout',
  city: 'Bengaluru',
  state: 'Karnataka',
  pinCode: '560102',
  country: 'India',
  shippingAddress: true
};

const FAVORITES = [
  {
    id: 1,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 1,
    price: 700
  },
  {
    id: 3,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 3,
    price: 700
  },
  {
    id: 3,
    title: 'Overloaded Choco',
    rating: 10,
    imageUrl: Product,
    category: 'Cakes',
    flavour: 'Chocolate',
    weight: 1,
    units: 6,
    price: 700
  }
];

const LISTING = {
  id: 1,
  listingImages: [
    {
      id: 1,
      imageUrl: Product
    },
    {
      id: 1,
      imageUrl: Product
    }
  ],
  title: 'Barbir Floral Cake',
  description:
    'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.',
  price: '1200',
  category: 'Custom Cake',
  rating: 5
};

const ORDERS = [
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Delivered'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Delivered'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Processing'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  },
  {
    id: 1947034,
    date: '05-02-2020',
    trackingNumber: 'DZ089223878',
    quantity: 3,
    totalAmount: 1400,
    status: 'Cancelled'
  }
];

const PAYMENT_OPTS = [
  {
    id: 1,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: true
  },
  {
    id: 2,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: false
  },
  {
    id: 3,
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '10/17',
    owner: 'Jane Doe',
    defaultCard: false
  }
];

const MENU = [
  {
    id: 1,
    title: 'My orders',
    details: '12 orders',
    link: '/demo/my-orders'
  },
  {
    id: 2,
    title: 'Delivery addresses',
    details: '3 ddresses',
    link: '/demo/shipping-address'
  },
  {
    id: 3,
    title: 'Payment methods',
    details: 'Visa **34',
    link: '/demo/payment-methods'
  },
  {
    id: 4,
    title: 'Promocodes',
    details: 'You have special promocodes',
    link: '/demo/promocodes'
  },
  {
    id: 5,
    title: 'My reviews',
    details: 'Reviews for 4 items',
    link: '/demo/reviews'
  },
  {
    id: 6,
    title: 'Settings',
    details: 'Notifications, password',
    link: '/demo/settings'
  }
];

const REVIEWS = [
  {
    id: 1,
    name: 'Helene',
    thumbnail: Avatar,
    review:
      'Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.',
    rating: '4',
    date: 'June 4, 2020',
    images: [
      {
        id: 1,
        image: Product
      },
      {
        id: 2,
        image: Product
      }
    ]
  },
  {
    id: 2,
    name: 'Helene',
    thumbnail: Avatar,
    review:
      'Fresh and delicious cake with on time service deliver. I had ordered "Death by chocolate" cake online sitting in Mumbai for my boyfriends birthday cheer, who is based in Bangalore. Initially I was skeptical if I had taken the right decision as I was clueless about the service. But later after placing the orders I saw the reviews and was very positive. I am happy with the commitment.',
    rating: '4',
    date: 'June 4, 2020',
    images: [
      {
        id: 1,
        image: Product
      },
      {
        id: 2,
        image: Product
      }
    ]
  }
];

const ADDRESSES = [
  {
    id: 1,
    addressName: 'Katrina',
    address: '22nd Cross Rd, Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: true
  },
  {
    id: 2,
    addressName: 'Katrina1',
    address: '22nd Cross Rd, Sector 2 HSR Layout',

    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: false
  },
  {
    id: 3,
    addressName: 'Katrina2',
    address: '22nd Cross Rd, Sector 2 HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560102',
    country: 'India',
    shippingAddress: false
  }
];

export {
  USER,
  USERS,
  PROFILELIST,
  CART,
  PROMOCODES,
  ADDRESSES,
  ADDRESS,
  FAVORITES,
  LISTING,
  ORDERS,
  ORDER,
  PAYMENT_OPTS,
  MENU,
  PERSONAL_INFO,
  REVIEWS
};
