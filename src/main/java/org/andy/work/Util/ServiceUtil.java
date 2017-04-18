package org.andy.work.Util;

import com.dcits.business.spring.SupportSystemFactoryBean;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Created by FuChuan7 on 2016-09-19.
 */
@Component
public class ServiceUtil implements ApplicationContextAware {
    @Autowired
    private static ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ServiceUtil.applicationContext = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    /**
     * 获取Service
     * @param beanName

     * @return Object service
     */
    public static Object getService(String beanName) {
        return applicationContext.getBean(beanName);
    }

    /**
     * 获取应用Service
     * @Title: getSupportService
     * @Description: TODO
     * @author h8wangjiabao
     * @date 2014-9-29 下午5:04:23
     * @return SupportSystemFactoryBean
     */
    public static SupportSystemFactoryBean getSupportService() {
        SupportSystemFactoryBean bean =  (SupportSystemFactoryBean)applicationContext.getBean("supportSystemBean");
        return bean;

    }
}
