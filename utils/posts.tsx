export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
}

export default [
  {
    id: "12345678909876",
    title: "First Test Post",
    summary: "First testing post, this is a summary",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. A pellentesque sit amet porttitor eget dolor morbi non. Quis enim lobortis scelerisque fermentum dui faucibus. Nibh cras pulvinar mattis nunc sed. Id aliquet lectus proin nibh. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Elit ut aliquam purus sit amet luctus venenatis lectus.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit. Velit laoreet id donec ultrices tincidunt arcu non. Ac turpis egestas integer eget aliquet. Commodo ullamcorper a lacus vestibulum sed arcu. Volutpat commodo sed egestas egestas fringilla. Lacinia at quis risus sed vulputate odio ut enim blandit. Sagittis purus sit amet volutpat.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo ullamcorper a. In nulla posuere sollicitudin aliquam. Ut etiam sit amet nisl purus in. Phasellus vestibulum lorem sed risus ultricies tristique nulla.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Nullam vehicula ipsum a arcu cursus. Tristique senectus et netus et malesuada fames. Lorem donec massa sapien faucibus.`,
    date: new Date("07/14/2020 12:52:25").toISOString(),
  },
  {
    id: "16147678504850",
    title: "Second Testing Post",
    summary: "Testing posts, this is more summary",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi proin.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra diam sit amet nisl suscipit adipiscing bibendum est.`,
    date: new Date("09/19/2020 16:34:10").toISOString(),
  },
] as BlogPost[];
