import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Panel = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
`;

const Card = styled.div`
  font-size: 10px;
  min-width: 280px;
  height: 216px;
  text-align: left;
  padding: 24px;
  margin-bottom: 25px;
  color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/7gAmQWRvYmUAZMAAAAABAwAVBAMGCg0AAAWlAAAFyQAACgMAAA1W/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAEOAakDAREAAhEBAxEB/8QAggABAQEBAQEBAAAAAAAAAAAAAAECBQQDBwEBAQEBAAAAAAAAAAAAAAAAAAECAxABAAAAAAAAAAAAAAAAAAAAoBEBAAAAAAAAAAAAAAAAAAAAoBIBAAAAAAAAAAAAAAAAAAAAoBMBAQEBAQEBAQADAQAAAAAAABEBECAwQFBwgKCQ/9oADAMBAAIRAxEAAAH8078BAQAAAhIhAAUFABapTRpLQoKUpSmqppKarRaqCKIAUHK5alCEAKAQEiAApaoAAKaKaspQCgpSlrRpNGqpqhSAhAQHM56hCCAFUEBIAFqlKACFKU1ZopQACgpa0aTRqtVSoUkWEJEIc7GoQkBSFAAQQLVNFKhSRQKaspo0AAAClrRpNGq1VKVBCLkkZIeDGoZIICgABAUpopUtASALWjRotEpFRAClqmk3WjVUpUEIuTMZIeLFysIQFAiUIClKU0lqgEEKpo0WtIUEiogBa0aTVaNVopUEIuTMZIeLFysIAAEiiApSmi2aABAUpTRqqhQSLIAFrRU0brRa0UJFhmMkIeDFiwIUCAgIUFKaS1SgEKCmi1pBQRUSkQorRU0arRqtFQRYZiEBzsagCAFgIQApSmktUFABSlLVKgLBEABS1TSU3Wq0UJFhIyBXM5aChQQEIICqDRSpaoBQUpS1UKJAAgAKWqaNpqtVoEISIQVyuWqUVQCEECVYFoaKVBaoKUpSggABAAAUtaNJutGqAzEIAcnlu1UoqkAiAAAtUpSpS1SlKAAQAAgABSmjVbTVUpCEiChyeXSpaqCggAAAKUtUoKlLWigEBAAAQAFKU2arSUpAQigcnlu1UtCgIAIAUFKWqUFNJRVIIgCkKIAEoLVNGjVUIWCJQHK5bpaqCgAUAAKEpSgtUpQUgBAAACgApUtaKUAEABzOe6C0ABUAAApaFKEoKUCkCAAAoqgFBSlSirECiAHOxupQAAKoAAKVBQWgKCgAgABQVBQWgKUFAIAAeDnu0AQpABQAC1QUAoCChRAAAVKKpQgoBQAAFAHixqgEFAAAUIKCgtAACgEAgBVKUqC0ABQABAKB5M0ACAAAFFCgFAQpKAAAsBQlBapQAUAAAAAp5c6IIAQAAoABQKFAAKAQAAoKVKBVAAAKAIAHmzoAQAAUACCgAAoAAAAAKKpQUAAAoAAKAefNAgAIAACigABQACoUQAoQUFAqgAAAoAi0EfCUQAEAAAABQAAKoAAAAKAVAAKAAAUAoB8c0QUBAAAAAACgAAoBACgCqAAUAAAFAKCnxzQSAKQSgAAAAKAAAAAAUAAoAAABQAUAp8pSFAiFAAAIAoAFIAAAABQAAAUAAAFAKAYlAgAIEAAKAAsAFAAAAAAAABQAAAUAFBmUCAEAAAAICgAAUCFAAAIAAKFBAAKoBEtFSBACAAEAAABQAAALIABAFACgKAogAACgARKAgAIAAAACgAgAAAAAAABQAAAAUAogShAAQAAAAAoBAAAAAAAAAAAUAAAoBYgoQAEAAAABQCAAAAAAAAAAAAAAoBQWBKEABAAAAAUAgAAAAAAAAAAAAAC1AKf/2gAIAQEAAQUCZZ//2gAIAQIAAQUCZZ//2gAIAQMAAQUCZZ//2gAIAQICBj8CZZ//2gAIAQMCBj8CZZ//2gAIAQEBBj8CZZ//2gAIAQEDAT8h/FET+DfxxET+BfxxET8eM/q4xn9TGfLf5eMZ8Nb/AC8Yz+rjGf1cYz5X+TWazWb8qv8AGqqzWazWaq+6v7r8Kqs1ms1VVVVVVfFX8tVVVVXxfFVms1VVVVVXzVVftVVVVVVVVVVV81VVVVVVV8VVX61VVVVVVVVVVV9VVVVVVVV8VVVVVfhVVVVVVVVVVVVfVVVVVVVVfFVVVVVVXl5VVVVVVVVVVVVVVVVVVVVVVVVfFXlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVfjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVflVVeVVVVVVVVVVVVVVVVVVVVVVVVVVX71VVVVVVV5VVVXlVVVVVVVVVVVVX8dVV7VVVVfFVVVVVVVVVVVVX8t/BVVVVVVVVVVeX+PVVVXtVeXt/k363/ef//aAAgBAgMBPyH/ALLP/9oACAEDAwE/If8Ass//2gAMAwEAAhEDEQAAEIIJJJAW+3322ycmaaStgH7oTBJFtBJIJIX2/wAkQGRa0ym7aBtYQQCCCSTvQCDtsiLZQLFpJbLaBtCHGSJKSZnySCf2JPPLI3LbZLKBtCYmiIECT+SSCSRb23/0pCmLJITlCYmyalgCQBSSADO2mu0qGQxJaR3wYuya1ySSQySSZU220nYHQzJaD8qJMBYHyEBQQQSZ23im5Q0mKLKC+6BuDIAQG1QSSQZk0kULSEiLZJAPkDeRbRIQLCTeCBMk0/bQgbJZLKTPQCBLStwASd14RJ8m7bJbJLJJZSc4Qa39huCB9t/yTdklLbLbMyk0pRmCX+0MPt/ttvtgLf0hKm2km20nIPvt5JDiAEk20/8AIEzdNfaaW27ZrQFEUAej7bQAAAv78gWWgkAkgCy9O2xpJL4kkLbf7Eg77fvf7f7pEESbr6W2lf8A34ABJH/zIIABIBBH3yZBABCScJKCf23+BBMl+0tgBm5B+32/+0kOksABJAe++STYALe/ZE+TJAJb2lrW323/AJCCQD7tv9rZd+wbZJbbSSkE0m22tv8AesAEgAkkgmb9JJtpJb/2y2SQAFpL/wC3/wD/AP8A+7BEttsltoJKVslttsgJJABIQJID326AABIBObybSbbf/wD9JLaACAASAQv/ALbb/b7/AG/Sbbbbbb+2/wDpP/paASQAASQSCBJ9pu22222kl/8A/wD/ANv/AKS222S2Wy3SXSSSTbJJBtttttJP/wD22/8A9vt9AZIbttpJI20kkkkkkm20km20m0kAIBJABJbJJJAEAAAE22kA22gA5AAAYADJJJIBJJI22/8AbaSEgSSSyWCAAAAAAASwAGSSSSSSS2SSSW2SySAgAgAAACwAySSSSSSSW/2SS/4SWAgAAAAAAAGSSSAAAAAD/wD/AP8A5PASAAAAAAAEAGSSAAAAAAB//wD/AOwnj//aAAgBAQMBPxBebvL51rW8iIzoiIzGYzGYzGYiIzGYxjGMYxjGd3PFZvhu8vb41vIiMxngIjMZjMZjMZiIiMxjGMYxjGMREbnNVeN7vL293sRmMxhnRERmMxmMxmIiInMYxnTGM8bjWtbqta3m+98ZjMZjMREREZjMZjMZiInjOYzwMYzuta1qtxvy3xmMxmMxE5ucjMZjMZjMRE5ueMZ0xjGd1reN5rWtxETzvMYxjMZ3c5OZjMZjGed7jGeBjGd1vTUa1vw3xjGMZ6zGMYz1vjGNNNM1msXm61rW83W9iJzebzOYxjGeYxjGM7ebvKqs1ms1pppms3u63Wt5G6vvW+cYxms1VXuMYxiqq8vjNZrNZrTTTNZqt1ut1u+FXlXm7zfGaxms1ms1V5jGMZyqqqqryqzWazwAzWardbrdVV3jCs1VVVVVVWazWazWaqqxjGcqqqqqqqrxhnkAZw3W63VVWGGazVVVXlVVZrNZrNZrNVms1ms1VVVXiqqqq8YZ4AYZw003wGGazWb0qqqqqqzWazWazWazWazWavxAKq8VVYZ0GGdGm+AzWazV8hVVVVWazWazWazWGGGfYAAqs1msMMMc7984zWazfIVVVVVWazWazWdGGGfUABVVWawwwz4//NZrN+IBVVVZrNZ4DPuXMKqqrDDDPj/qzV+gAKwzfyAAAM/EAP5VXpfmAGfiAAAwwwz8IAEKqqqqv6wAAADDDDPwgAAqqqqqr5C/lAAAMMMM/CAACqqqqqqqqr9QAL7ArOGfiAAAqqqqqqqqqqqr5Cr8AFVfygAAFVVVVXFVVVVVVVeKqqqqqqqqq/hAAC8VVVVVVVVVVVVVVVVVVVVVVVVVfYFXwLxV4vKqqqqqqqqqqqquqqqqqqqqqqqq8VVVVVVVV8qvaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr2r+Gqqqqqqqqqqqqqqqqqqqqr43fFVVVfdVV9VVXtVVVVXtVVVVVV7vi/Cqv4qqqq+Kqqvavne75v4Kqqqqqr6qrnqr27+PPNX7VV9VVXtXzvjflnjd/JVVfrv4d/Xm/Lfrnjf4P//aAAgBAgMBPxD/ABDf94L/AMVf/9oACAEDAwE/EP8Az5if4En/ALXf/9k=)
    no-repeat 0 0 #141819;
`;

const Front = styled(Card)`
  font-size: 16px;
  font-family: 'Source Code Pro';
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);
`;

const Number = styled.div`
  font-family: Metropolis, QuickSand;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 3px;
  padding-top: 34px;
`;

const ExpiryDate = styled.div`
  font-family: Metropolis, QuickSand;
  font-size: 14px;
  color: #ffffff;
`;

const Owner = styled.div`
  font-family: Metropolis, QuickSand;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
`;

const Logo = styled.img`
  width: 50px;
  height: 16px;
`;

const Chip = styled.div`
  width: 32px;
  height: 24px;
  background: radial-gradient(#d9a56c, #b18457);
  border-radius: 8px;
  transform: translate(0px, 0px);
  overflow: hidden;
`;

const ReaderRisk = styled.div`
  width: 32px;
  height: 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #666;
  position: absolute;
  z-index: 0;
`;

const ReaderRisk1 = styled(ReaderRisk)`
  transform: translate(16px, 16px);
`;
const ReaderRisk2 = styled(ReaderRisk)`
  transform: translate(24px, 5px);
`;
const ReaderRisk3 = styled(ReaderRisk)`
  transform: translate(-22px, -9px);
`;
const ReaderRisk4 = styled(ReaderRisk)`
  transform: translate(-10px, -16px);
`;

const Text = styled.div`
  font-family: Metropolis, QuickSand;
  font-size: 10px;
  line-height: 22px;
  color: #ffffff;
`;

const PaymentCardComponent = props => {
  const { card, extra } = props;

  return (
    <Row>
      <Col span={24}>
        <Row type="flex" justify="center" align="middle">
          <Panel>
            <Front>
              <Col spane={24}>
                <Row type="flex" justify="end">
                  <Logo src="data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTAxLTEyVDE5OjAxOjgxPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNj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" />
                </Row>
              </Col>
              <Col spane={24}>
                <Number>{`**** **** **** ${card.cardNumber.substr(card.cardNumber.length - 4)}`}</Number>
              </Col>
              <Col spane={24}>
                <Chip>
                  <ReaderRisk1 />
                  <ReaderRisk2 />
                  <ReaderRisk3 />
                  <ReaderRisk4 />
                </Chip>
              </Col>
              <div style={{ paddingTop: '17px' }}>
                <Col span={24}>
                  <Row>
                    <Col span={12}>
                      <Row type="flex" justify="start">
                        <span style={{ display: 'block' }}>
                          <Text>Card Holder Name</Text>
                          <Owner>{card.owner}</Owner>
                        </span>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row type="flex" justify="end">
                        <span style={{ display: 'block' }}>
                          <Text>Expiry Date</Text>
                          <ExpiryDate>{card.expiryDate}</ExpiryDate>
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Front>
          </Panel>
        </Row>
      </Col>
      <Col span={24} style={{ height: '35px' }}>
        {extra && extra}
      </Col>
    </Row>
  );
};

PaymentCardComponent.propTypes = {
  card: PropTypes.object,
  extra: PropTypes.any
};

export default PaymentCardComponent;
