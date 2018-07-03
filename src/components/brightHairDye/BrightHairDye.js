import React from 'react'
import styled from 'styled-components'
import common from '../common/commonIndex'
const {
  styles: { media, sc }
} = common
import images from '../../images/imageIndex'
const { bright_hair_dye } = images

const BrightHairDye = () => (
  <div>
    <sc.H1>明るい白髪染め</sc.H1>
    <FlexContainer>
      <FlexItem src={bright_hair_dye[3]} alt="実際のカーラリング例" />
      <FlexItem src={bright_hair_dye[4]} alt="実際のカーラリング例" />
      <FlexItem src={bright_hair_dye[5]} alt="実際のカーラリング例" />
    </FlexContainer>
    <sc.P>本当に明るくなる「明るい白髪染め」</sc.P>
    <sc.P>こんにちわ。</sc.P>
    <sc.P>フワフワ！美容室の荒木ヤスコロリと申します。</sc.P>
    <br />
    <sc.P>2～3年前からニーズが高まってきた、白髪染めを明るめで染める技術。</sc.P>
    <sc.P>これは、90年～2000年代のヘアカラーブーム時代にキャピキャピだった世代が</sc.P>
    <sc.P>白髪が気になるオトナ女子の年頃となり</sc.P>
    <sc.P>
      だけど今まで通りの明るいヘアカラーや、そこまで明るくなくても良いけど透明感を感じるヘアカラーにしたいのに
    </sc.P>
    <sc.P>
      美容室で「白髪染めは暗くしか染まりませんよ。明るくしたかったら白髪はそのままですよ。どうします？」
    </sc.P>
    <sc.P>とムゲに言われて(/・ω・)ｴｰｿﾘｬﾅｲﾖｰ</sc.P>
    <sc.P>となってガーンと落ち込むという</sc.P>
    <sc.P>そういう風景が日本全国いたるところでで繰り広げられて</sc.P>
    <sc.P>
      助けてドラえもん…的な彼女たちの気持ちに応えるべくいろいろ工夫されるようになってきたというわけです。
    </sc.P>
    <sc.P>かくいう私も、美容師として現場でお客様のニーズを日々肌で感じているので</sc.P>
    <sc.P>「こりゃどげんかせんといかんばい」と古い流行語を何度も口にして</sc.P>
    <sc.P>
      様々なやり方を私達なりに工夫してきた結果、今のフワフワ流「明るい白髪染め」にたどり着きました。
    </sc.P>
    <Img src={bright_hair_dye[0]} alt="実際のカーラリング例" />
    <sc.P>私達の「明るい白髪染め」は、本当に明るく染まります。</sc.P>
    <sc.P>かくいう私自身も白髪染めで染めています。</sc.P>
    <Img src={bright_hair_dye[1]} alt="ヤスコロリの写真1" />
    <sc.P>
      フワフワ！美容室で「明るい白髪染め」を初めてされるときは初回のみダブルカラー（2回カラー）で染めさせて頂いています。
    </sc.P>
    <sc.P>
      これは、うちで明るい白髪染めを希望される殆どのお客様の髪に今までの白髪染めの暗いブラウンの色素が深く入ってしまっているためで、一度これをリセットして（抜いて）から、ご希望の明るさのカラーで染めていきます。
    </sc.P>
    <sc.P>ダブルカラーで染めることで、独特の透明感が表現できます。</sc.P>
    <sc.P>でもダブルカラーするのはこの一回だけです。</sc.P>
    <sc.P>
      二回目以降の来店では通常カラーの「明るい白髪染め」で、初回にダブルカラーでつくった透明感を維持しながら、白髪もカバーしていくことが出来ます。
    </sc.P>
    <sc.P>じっさいにうちでずっと以前から「明るい白髪染め」をされているお客様の髪は</sc.P>
    <sc.P>回数を重ねて暗くなってきたり</sc.P>
    <sc.P>ムラになったり</sc.P>
    <sc.P>毛先がダメージでバサバサになったり</sc.P>
    <sc.P>なんて事はありません。</sc.P>
    <sc.P>むしろひんぱんにカラーに来られている方ほど髪の見た目も状態も良い傾向がみられます。</sc.P>
    <sc.P>これは私独自の「明るい白髪染め」の特徴です。</sc.P>
    <sc.P>
      薬剤が特別なワケではなく、技術と確実な手順によってのみ実現できるカラーリングだと胸を張ることができます。
    </sc.P>
    <sc.P>普通のカラーもですが、白髪染めは特に複雑でとても難しい技術です。</sc.P>
    <sc.P>最近、多くのメーカーが明るく染まる白髪染めを発売しています。</sc.P>
    <sc.P>それで「明るい白髪染め」は一般的なフレーズになってきましたが</sc.P>
    <sc.P>フワフワ！美容室の「明るい白髪染め」は自信をもって他とは違うと断言できます。</sc.P>
    <sc.P>だって私が考えたたんだもん。（笑）</sc.P>
    <sc.P>「赤っぽくない」</sc.P>
    <sc.P>「透明感がある」</sc.P>
    <sc.P>「アッシュ、ベージュ、グレー系でも染まる」</sc.P>
    <sc.P>白髪染めの概念を覆す、白髪染め界の暴れん坊。</sc.P>
    <sc.P>こちらは少落ち着いたしピンクベージュ。抑えめの明るさでも透明感があります。</sc.P>
    <Img src={bright_hair_dye[2]} alt="実際のカーラリング例" />
    <sc.P>白髪染めが暗く染まる問題に悩まれている大人女子のみなさん</sc.P>
    <sc.P>是非一度私にご相談ください( ｀ー´)ノ </sc.P>
  </div>
)

const Img = sc.Img.extend`
  width: 70%;
  margin: 3vw 0;

  ${media.desktop`
    margin: 30px 0;
  `};
`

const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 48%);
  grid-gap: 10px;
  justify-content: center;
  margin: 3vw 0;

  ${media.desktop`
    grid-template-columns: repeat(auto-fill, 31%);
    margin: 30px 0;
  `};
`

const FlexItem = styled.img`
  width: 100%;
  object-fit: contain;
`

export default BrightHairDye
