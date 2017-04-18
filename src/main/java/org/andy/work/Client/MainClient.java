package org.andy.work.Client;

import org.apache.mina.core.filterchain.DefaultIoFilterChainBuilder;
import org.apache.mina.core.future.ConnectFuture;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.codec.textline.TextLineCodecFactory;
import org.apache.mina.transport.socket.nio.NioSocketConnector;

import java.net.InetSocketAddress;

/**
 * Created by 田雷 on 2016/9/5.
 */
public class MainClient {
    /**
     * 服务器ip
     */
    private static final String SERVER_IP="127.0.0.1";

    /**
     * 服务器端口
     */
    private static final int SERVER_PORT=8899;

    public static void main(String []args){

        //Create TCP/IP connection
        NioSocketConnector connector = new NioSocketConnector();

        //创建接受数据的过滤器
        DefaultIoFilterChainBuilder chain = connector.getFilterChain();

        //设定这个过滤器将一行一行(/r/n)的读取数据
        chain.addLast("myChain", new ProtocolCodecFilter(new TextLineCodecFactory()));

        //服务器的消息处理器：一个 SimpleMinaClientHandler 对象
        connector.setHandler(new SimpleMinaClientHandler());

        //set connect timeout
        connector.setConnectTimeoutMillis(30 * 1000);

        //连接到服务器：
        ConnectFuture cf = connector.connect(new InetSocketAddress(SERVER_IP,SERVER_PORT));

        cf.awaitUninterruptibly();

        cf.getSession().getCloseFuture().awaitUninterruptibly();

        connector.dispose();
    }
}
