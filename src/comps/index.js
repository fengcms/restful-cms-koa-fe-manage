import TableList from './TableList'
import Row from './Row'
import ControlBox from './ControlBox'
import ControlBtn from './ControlBtn'
import TableSearch from './TableSearch'
import OneLineText from './OneLineText'
import Tip from './Tip'
import Tag from './Tag'
import UpImg from './UpImg'
import ImageList from './ImageList'
import FlexBox from './FlexBox'
import FlexItem from './FlexItem'
import CardItem from './CardItem'
import PageMain from './PageMain'
import TableImage from './TableImage'
import RichEditor from './editor/RichEditor'
import MarkEditor from './editor/MarkEditor'

const comps = [
  TableList,
  Row,
  ControlBox,
  ControlBtn,
  TableSearch,
  OneLineText,
  Tip,
  Tag,
  UpImg,
  ImageList,
  RichEditor,
  FlexBox,
  FlexItem,
  CardItem,
  PageMain,
  TableImage,
  MarkEditor
]

const install = function (Vue, opts = {}) {
  comps.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  TableList,
  Row,
  ControlBox,
  ControlBtn,
  TableSearch,
  OneLineText,
  Tip,
  Tag,
  UpImg,
  ImageList,
  RichEditor,
  FlexBox,
  FlexItem,
  CardItem,
  PageMain,
  TableImage,
  MarkEditor
}
