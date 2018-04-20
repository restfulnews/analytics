<template>
  <div class="timeline">
    <ul>
      <div v-for="ticker in tickers" :key="ticker">
        <li>
          <span class="title-eyebrow">{{ticker}}</span>
        </li>
        <div v-for="date in getDates(getData(results, ticker))" :key="date">
          <li>
            <span class="big-eyebrow">{{date}}</span>
          </li>
          <div v-for="result in getData(dateFilter(results, date), ticker)" :key="result">
            <li>
              <span class="eyebrow">{{formatTime(result.publishedAt)}}</span>
              <div class="block">
                  <h1>{{result.title}}</h1>
                  <p> {{result.abstract}} </p>
              </div>
            </li>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: ['results', 'tickers'],
  methods : {
    getData(raw, companyname) {
      const arrayLength = raw.length;
      const data = [];
      for (let i = 0; i < arrayLength; i += 1) {
        const singleData = (raw[i]);
        if (singleData.title.toLowerCase().includes(companyname.toLowerCase())){
          data.push(singleData);
        }
      }
      return data.sort((a,b) => {
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      });
    },
    getDates(raw) {
      const dates = []
      const arrayLength = raw.length;
      for (var i = 0; i < arrayLength; i += 1) {
        const singleData = (raw[i]);
        const date = new Date(singleData.publishedAt);
        const year = date.getFullYear();
        if (!dates.includes(year)){
          dates.push(year);
        }
      }
      return dates.sort();
    },
    dateFilter(raw, compyear) {
        const data = [];
        (compyear.toString())
        const arrayLength = raw.length;
        for (let i = 0; i < arrayLength; i += 1) {
            const singleData = (raw[i]);
            const date = new Date(singleData.publishedAt);
            const year = date.getFullYear();
            if (year.toString() === compyear.toString()){
              data.push(singleData);
            }
        }
        return data;
    },
    formatTime(time) {
      const rawtime = new Date(time);
      return rawtime.toDateString();
    }
  },
};
</script>

<style lang="scss" scoped>
$color: #383838;
$softcolor: #585858;
$titlecolor: #282828;
$size: 10px;
img {
  max-width: 100%;
}
.block{
  margin-top: 20px;
}
.timeline {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  h2.break {
    display: block;
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin: 0;
    padding: 25px 0 25px 25px;
    position: relative;
    left: -5px;
  }
  ul {
    color: $color;
    list-style-type: none;
    position: relative;
    padding: 25px 0 25px 10px;
    font-size: 18px;
    margin: 0;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: -4.5px;
      bottom: 0;
      border-left: 1px solid #ccc;
      height: 100%;
    }
    li {
      margin: 15px 0 35px 10px;
      position: relative;
      display: block;
      &:last-child {
        margin-bottom: 0px;
      }
      .card {
        display: block;
        border: 1px solid #ccc;
        padding: 15px;
        background: #f1f1f1;
      }
      h1 {
        color: $color;
        margin: 0 0 15px 0;
      }
      p {
        color: rgba($color, 0.5);
        margin: 0 0 15px 0;
        font-size: 12px;
      }
      .eyebrow {
        display: table;
        color: white;
        background-color: $softcolor;
        font-size: 9px;
        padding: 4px 7px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
        position: relative;
        top: 3.5px;
        outline: 2px solid white;
        z-index: 0;
        max-width: 300px;
        line-height: 1.2;
        &:before {
          content: "";
          position: absolute;
          left: -20px;
          border-bottom: 1px solid #ccc;
          width: 20px;
          top: 9px;
          z-index: -1;
        }
      }
      .big-eyebrow {
        display: table;
        color: white;
        background-color: $color;
        font-size: 20px;
        padding: 4px 7px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
        position: relative;
        top: 3.5px;
        outline: 2px solid white;
        z-index: 0;
        max-width: 300px;
        line-height: 1.2;
        &:before {
          content: "";
          position: absolute;
          left: -20px;
          border-bottom: 1px solid #ccc;
          width: 20px;
          top: 9px;
          z-index: -1;
        }
      }
      .title-eyebrow {
        display: table;
        color: white;
        background-color: $titlecolor;
        font-size: 25px;
        padding: 4px 7px;
        letter-spacing: 1px;
        margin-bottom: 8px;
        position: relative;
        top: 3.5px;
        outline: 2px solid white;
        z-index: 0;
        max-width: 300px;
        line-height: 1.2;
        &:before {
          content: "";
          position: absolute;
          left: -20px;
          border-bottom: 1px solid #ccc;
          width: 20px;
          top: 9px;
          z-index: -1;
        }
      }
      &:before {
        content: "";
        display: block;
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: white;
        border: 1px solid rgba($color, 0.5);
        position: absolute;
        z-index: 2;
        left: -30px;
        outline: 2px solid white;
        top: 7.5px;
      }
    }
  }
}

//video
.m-video {
  -webkit-transform: translate3d(0,0,0);
  margin-bottom: 15px;
  .m-video__inner {
    -webkit-transform: translate3d(0,0,0);
    //responsive video wrapper
    position: relative;
    height: 0;
    padding-top: 56.25%;
    width: 100%;
    clear: both;
    overflow: hidden;
    .embed {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      iframe,
      object,
      video {
        height:100%;
        width:100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
