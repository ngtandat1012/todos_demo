export default function html([first, ...strings], ...values){
    return values.reduce(
        (acc, cur) => acc.concat(cur,strings.shift()),
       
    [first]).filter(x => x && x !== true || x === 0)
    .join('')
   

    // return values.reduce((acc, cur) => acc.concat(cur, strings.shift()),
    //     [first]).filter(x => x && x !== true || x === 0).join('');
}
export function createStore(reducer){
    //createStors là 1 cái hàm và nhận đối số là render
    //và nó mong muốn reducer mặc định return nhận 1 giá trị khởi tạo là state banh đầu sang reducer.js
    let state = reducer()
    const roots = new Map()

    function render() {
        for(const[root, component] of roots){
            //nó sẽ map qua thằng roots nhận đc cái root vừa set và component 
            //component ở file App /attach(App, document.getElementById('root'))/ mail.js dòng số 5
            const output = component()
            //component chạy nó gọi tới hàm App tới App.js và nhận html của thằng App.js
            // và lưu vào cái output
            root.innerHTML = output
            //lưu cái output là html và nó đẩy cho thằng root và nó sang file mail và render ra view
        }
    }
    return {
        attach (component,root){
            roots.set(root,component)
            //set root thành key và commponent thành value
            render()
            //gọi lại hàm render
        },
        connect(selector = state => state){
            return component => (props, ...args) =>
             /* connect chạy nó sẽ return 1 cái arrow function nó nhận
                đối số là component nó sẽ lưu vào connector của App.js 
                const connector = connect() bở vì connector là 1 hàm

                */
                component(Object.assign({},props, selector(state), ...args))
                /*
                đạng gọi App của app.js
                 nhận đc 1 ham mới chạy component và run cái function App và trả lại
                 1 Object đc hơp nhất bở  props state args
                */
               
        },
        //hàm đẩy dữ liệu từ store sang view
        dispatch(action,...args){
            state = reducer(state, action, args)
            render()
        }
        /* dispatch đc chạy nó sẽ gọi hàm rudecer nó lấy giá
         trị trước đó state  let state = reducer()
        */
    }
}